/* Snack Print — main app */
const { useState, useEffect, useCallback, useMemo: useMemoApp } = React;

const UNIT_OPTS = [
  { k: "100g", label: "100 g" },
  { k: "serving", label: "serving" },
  { k: "yearly", label: "yearly habit" },
];

const MODES = [
  { k: "till", label: "TILL" },
  { k: "basket", label: "BASKET" },
  { k: "league", label: "LEAGUE" },
];

const T = {
  grain: 60,
  unitsDefault: "100g",
  accent: "#b23a2e",
  paper: "#f3ede0",
};

function CompareBar({ ids, unit, freq, region, accent }) {
  if (ids.length < 2) return null;
  const items = ids.map((id) => {
    const s = SNACKS.find((x) => x.id === id);
    const total = snackTotal(s, region) * unitFactor(s, unit, freq);
    return { s, total, dom: dominantStage(s, region) };
  });
  const maxTotal = Math.max(...items.map((i) => i.total));
  return (
    <div className="compare-bar">
      <div className="compare-title">COMPARE &middot; {ids.length} on the till</div>
      <div className="compare-chips">
        {items.map(({ s, total, dom }) => {
          const f = fmtCO2(total);
          const isMax = total === maxTotal;
          return (
            <div className={"cmp-chip" + (isMax ? " cmp-max" : "")} key={s.id}>
              <span className="cmp-name">{s.name}</span>
              <span className="cmp-total">{f.num} {f.unit}{isMax && <em> &mdash; biggest</em>}</span>
              <span className="cmp-dom" style={{ color: accent }}>
                &#9733; {STAGES.find((x) => x.key === dom).short}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const t = T;
  const [ids, setIds] = useState([]);
  const [unit, setUnit] = useState(t.unitsDefault);
  const [freq, setFreq] = useState(3);
  const [mode, setMode] = useState("till");
  const [basket, setBasket] = useState({});
  const [region, setRegion] = useState("EU");
  const [soundOn, setSoundOn] = useState(true);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState(null);

  useEffect(() => { if (window.printerSound) window.printerSound.setEnabled(soundOn); }, [soundOn]);

  const printToTill = useCallback((snack) => {
    setIds((cur) => {
      if (cur.includes(snack.id)) return cur.filter((x) => x !== snack.id);
      if (cur.length >= 3) return cur;
      return [...cur, snack.id];
    });
  }, []);

  const onTileAction = useCallback((snack) => {
    if (mode === "basket") {
      setBasket((cur) => Object.assign({}, cur, { [snack.id]: (cur[snack.id] || 0) + 1 }));
    } else {
      printToTill(snack);
      if (mode === "league") setMode("till");
    }
  }, [mode, printToTill]);

  const addFromLeague = useCallback((snack) => {
    setIds((cur) => {
      if (cur.includes(snack.id)) return cur;
      if (cur.length >= 3) return [...cur.slice(1), snack.id];
      return [...cur, snack.id];
    });
    setMode("till");
  }, []);

  const remove = (id) => setIds((cur) => cur.filter((x) => x !== id));
  const clear = () => setIds([]);

  const filtered = useMemoApp(() => {
    const q = query.trim().toLowerCase();
    return SNACKS.filter((s) => {
      if (stageFilter && dominantStage(s, region) !== stageFilter) return false;
      if (!q) return true;
      return (s.name + " " + s.cat + " " + s.tag + " " + s.sku).toLowerCase().includes(q);
    });
  }, [query, stageFilter, region]);

  const lastCat = ids.length
    ? SNACKS.find((s) => s.id === ids[ids.length - 1]).cat
    : null;

  const grainOp = (t.grain / 100) * 0.55;
  const fade = 0.6 + (1 - t.grain / 100) * 0.4;

  const rootStyle = {
    "--mono": "'IBM Plex Mono', monospace",
    "--accent": t.accent,
    "--paper": t.paper,
    "--grain-op": grainOp,
    "--ink-alpha": fade,
  };

  const basketCount = Object.values(basket).reduce((a, b) => a + b, 0);

  return (
    <div className="app" style={rootStyle}>
      <header className="topbar">
        <div className="brand-row">
          <div className="brand">SNACK&#8202;PRINT</div>
          <div className="brand-bc" aria-hidden="true" />
        </div>
        <p className="tagline">
          Every snack you love leaves a print &mdash; part fingerprint, part till
          receipt, made of carbon. Tap a snack to print its life-cycle footprint.
        </p>
      </header>

      <div className="layout">
        <div className="col-shelf">
          <div className="section-head">
            <span className="sh-title">THE SHELF</span>
            <span className="sh-sub">{SNACKS.length} snacks &middot; 20 aisles</span>
          </div>
          <div className="shelf-tools">
            <input
              className="search"
              type="text"
              placeholder="Search snacks, aisles, tags&hellip;"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="chips">
              <button className={"chip" + (!stageFilter ? " on" : "")} onClick={() => setStageFilter(null)}>ALL</button>
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  className={"chip" + (stageFilter === s.key ? " on" : "")}
                  onClick={() => setStageFilter(stageFilter === s.key ? null : s.key)}
                  title={"Snacks dominated by " + s.label.toLowerCase()}
                >{s.short.slice(0, 5)}</button>
              ))}
            </div>
            {(query || stageFilter) && (
              <div className="filter-note">{filtered.length} of {SNACKS.length} snacks</div>
            )}
          </div>
          <Shelf
            snacks={filtered}
            onAction={onTileAction}
            activeIds={ids}
            atCapacity={ids.length >= 3}
            mode={mode}
            basket={basket}
          />
        </div>

        <div className="col-till">
          <div className="mode-tabs">
            {MODES.map((m) => (
              <button
                key={m.k}
                className={"mode-tab" + (mode === m.k ? " on" : "")}
                onClick={() => setMode(m.k)}
              >
                {m.label}
                {m.k === "till" && ids.length > 0 && <em>{ids.length}</em>}
                {m.k === "basket" && basketCount > 0 && <em>{basketCount}</em>}
              </button>
            ))}
          </div>

          <div className="till-controls">
            <div className="ctrl-block">
              <div className="ctrl-label">UNITS</div>
              <div className="seg2">
                {UNIT_OPTS.map((o) => (
                  <button
                    key={o.k}
                    className={"seg-btn" + (unit === o.k ? " on" : "")}
                    onClick={() => setUnit(o.k)}
                  >{o.label}</button>
                ))}
              </div>
            </div>
            {unit === "yearly" && mode !== "basket" && (
              <div className="ctrl-block">
                <div className="ctrl-label">YOUR HABIT</div>
                <div className="freq">
                  <button className="freq-btn" onClick={() => setFreq((f) => Math.max(1, f - 1))}>&minus;</button>
                  <span className="freq-val">{freq}&times;<small>/week</small></span>
                  <button className="freq-btn" onClick={() => setFreq((f) => Math.min(21, f + 1))}>+</button>
                </div>
              </div>
            )}
            <div className="ctrl-block">
              <div className="ctrl-label">REGION</div>
              <div className="seg2">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    className={"seg-btn" + (region === r ? " on" : "")}
                    onClick={() => setRegion(r)}
                    title={"Transport \u00d7" + REGION_T[r] + " (modelled)"}
                  >{r}</button>
                ))}
              </div>
            </div>
            <button
              className={"snd-btn" + (soundOn ? " on" : "")}
              onClick={() => setSoundOn(!soundOn)}
              title={soundOn ? "Mute printer sounds" : "Enable printer sounds"}
            >{soundOn ? "\u266a SND ON" : "\u266a SND OFF"}</button>
            {mode === "till" && ids.length > 0 && (
              <button className="clear-btn" onClick={clear}>CLEAR TILL</button>
            )}
          </div>

          {mode === "till" && (
            <CompareBar ids={ids} unit={unit} freq={freq} region={region} accent={t.accent} />
          )}

          {mode === "till" && (
            <div className={"rail" + (ids.length === 0 ? " empty" : "")}>
              {ids.length === 0 ? (
                <div className="rail-empty">
                  <div className="rail-empty-bc" aria-hidden="true" />
                  <div className="rail-empty-txt">
                    NO RECEIPTS YET<br />
                    <span>Tap PRINT on a snack to thermal-print its Snack Print. Pull a receipt down to tear it off.</span>
                  </div>
                </div>
              ) : (
                ids.map((id) => {
                  const snack = SNACKS.find((s) => s.id === id);
                  return (
                    <Receipt
                      key={id}
                      snack={snack}
                      unit={unit}
                      freq={freq}
                      region={region}
                      accent={t.accent}
                      sound={soundOn}
                      onRemove={() => remove(id)}
                    />
                  );
                })
              )}
            </div>
          )}

          {mode === "basket" && (
            <div className="rail basket-rail">
              <BasketView basket={basket} setBasket={setBasket} region={region} accent={t.accent} />
            </div>
          )}

          {mode === "league" && (
            <div className="rail league-rail">
              <LeagueView unit={unit} freq={freq} region={region} accent={t.accent} onAdd={addFromLeague} />
            </div>
          )}
        </div>
      </div>

      <section className="data-strip">
        <div className="section-head section-head--data">
          <span className="sh-title">UNUSUAL DATA</span>
          <span className="sh-sub">two angles you don&#39;t usually see on a label</span>
        </div>
        <div className="panels">
          <PackagingTrendPanel />
          <AdditivesPanel category={lastCat} region={region} />
        </div>
      </section>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
