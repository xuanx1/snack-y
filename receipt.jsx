/* Snack Print — Receipt + Barcode (deep-dive, swap, decoder, tear-off, copy/print, sound) */
const { useMemo, useState, useEffect, useRef } = React;

// deterministic pseudo-random from a string seed
function seeded(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return function () { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Barcode: each STAGE occupies a slice proportional to its share of total.
// Stripe pattern inside the slice is decorative; the SLICE WIDTH is the data.
function Barcode({ snack, accent, dom, region, decoded, onToggle }) {
  const groups = useMemo(() => {
    const total = snackTotal(snack, region);
    const rnd = seeded(snack.id);
    return STAGE_KEYS.map((k) => {
      const share = stageVal(snack, k, region) / total;
      const pairs = Math.max(2, Math.round(share * 22));
      const segs = [];
      let acc = 0;
      for (let i = 0; i < pairs * 2; i++) {
        const w = 0.4 + rnd() * 1.6;
        segs.push({ ink: i % 2 === 0, w });
        acc += w;
      }
      segs.forEach((s) => { s.pct = (s.w / acc) * 100; });
      return { key: k, share, segs, dom: k === dom };
    });
  }, [snack, dom, region]);

  return (
    <div className="barcode-wrap">
      <div
        className={"barcode" + (decoded ? " decoded" : "")}
        onClick={onToggle}
        title={decoded ? "Hide decoding" : "Decode this barcode"}
      >
        {groups.map((grp) => (
          <span className="bc-group" key={grp.key} style={{ width: (grp.share * 100) + "%" }}>
            {grp.segs.map((s, i) => (
              <span
                key={i}
                className="bc-stripe"
                style={{
                  width: s.pct + "%",
                  background: s.ink ? (grp.dom ? accent : "var(--ink)") : "transparent",
                }}
              />
            ))}
          </span>
        ))}
      </div>
      {decoded ? (
        <div className="bc-decode">
          {groups.map((grp) => {
            const st = STAGES.find((s) => s.key === grp.key);
            return (
              <div className="bcd-row" key={grp.key}>
                <span className="bcd-sw" style={{ background: grp.dom ? accent : "var(--ink)" }} />
                <span className="bcd-name">{st.short}</span>
                <span className="bcd-dots" />
                <span className="bcd-pct">{Math.round(grp.share * 100)}% of stripe width</span>
              </div>
            );
          })}
          <div className="barcode-caption">each stage owns a slice of the barcode &mdash; slice width = its share of emissions</div>
        </div>
      ) : (
        <div className="barcode-caption">
          <span className="bc-arrow">&#9656;</span> stripe widths encode each stage&#39;s share &mdash; tap barcode to decode
        </div>
      )}
    </div>
  );
}

function StageRow({ snack, k, factor, accent, dom, maxShare, region, expanded, onToggle }) {
  const stage = STAGES.find((s) => s.key === k);
  const total = snackTotal(snack, region);
  const val = stageVal(snack, k, region) * factor;
  const share = stageVal(snack, k, region) / total;
  const f = fmtCO2(val);
  const isDom = k === dom;
  return (
    <div className={"stage-row" + (isDom ? " is-dom" : "") + (expanded ? " open" : "")}>
      <div className="stage-head" onClick={onToggle} role="button" title="What drives this stage?">
        <span className="stage-name">
          {isDom && <span className="dom-star" style={{ color: accent }}>&#9733;</span>}
          {stage.short}
          <span className="stage-caret">{expanded ? "\u25be" : "\u25b8"}</span>
        </span>
        <span className="stage-val">
          {f.num}<span className="stage-unit">&nbsp;{f.unit}</span>
        </span>
      </div>
      <div className="stage-bar-track">
        <div
          className="stage-bar-fill"
          style={{ width: (share / maxShare) * 100 + "%", background: isDom ? accent : "var(--ink)" }}
        />
        <span className="stage-pct">{Math.round(share * 100)}%</span>
      </div>
      {expanded && (
        <div className="stage-info">{STAGE_INFO[k]}</div>
      )}
    </div>
  );
}

function Receipt({ snack, unit, freq, region, accent, onRemove, sound }) {
  const dom = dominantStage(snack, region);
  const factor = unitFactor(snack, unit, freq);
  const totalRaw = snackTotal(snack, region);
  const total = totalRaw * factor;
  const maxShare = Math.max(...STAGE_KEYS.map((k) => stageVal(snack, k, region) / totalRaw));
  const f = fmtCO2(total);
  const domStage = STAGES.find((s) => s.key === dom);
  const swap = bestSwap(snack, region);

  const carKm = total / EQUIV.car_km.perUnit;
  const showers = total / EQUIV.showers.perUnit;

  const now = new Date();
  const ts = now.toISOString().slice(0, 10) + "  " + now.toTimeString().slice(0, 5);

  let line = 0;
  const L = () => ({ animationDelay: (line++ * 55) + "ms" });

  const [printing, setPrinting] = useState(true);
  const [expandedStage, setExpandedStage] = useState(null);
  const [decoded, setDecoded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [torn, setTorn] = useState(false);
  const rootRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setPrinting(false); return; }
    setPrinting(true);
    if (sound && window.printerSound) window.printerSound.play(30);
    const id = setTimeout(() => setPrinting(false), 2300);
    return () => clearTimeout(id);
  }, [snack.id]);

  // tear-off drag
  const onGripDown = (e) => {
    e.preventDefault();
    dragRef.current = { y0: e.clientY, dy: 0 };
    try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
  };
  const onGripMove = (e) => {
    if (!dragRef.current) return;
    const dy = Math.max(0, e.clientY - dragRef.current.y0);
    dragRef.current.dy = dy;
    const el = rootRef.current;
    if (el) {
      el.style.transition = "none";
      el.style.transform = "translateY(" + (dy * 0.55) + "px) rotate(" + Math.min(dy * 0.02, 3) + "deg)";
    }
  };
  const onGripUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    const el = rootRef.current;
    if (d && d.dy > 80) {
      if (sound && window.printerSound) window.printerSound.tear();
      if (el) { el.style.transform = ""; el.style.transition = "none"; }
      setTorn(true);
      setTimeout(onRemove, 460);
    } else if (el) {
      el.style.transition = "transform 0.25s cubic-bezier(.2,1.6,.4,1)";
      el.style.transform = "";
    }
  };

  const doCopy = () => {
    const txt = asciiReceipt(snack, unit, freq, region);
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done).catch(done);
    } else { done(); }
  };

  const doPrint = () => {
    const el = rootRef.current;
    if (!el) return;
    el.classList.add("print-target");
    document.body.classList.add("print-one");
    const cleanup = () => {
      el.classList.remove("print-target");
      document.body.classList.remove("print-one");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    setTimeout(() => window.print(), 30);
    setTimeout(cleanup, 4000);
  };

  return (
    <div
      ref={rootRef}
      className={"receipt" + (printing ? " printing" : "") + (torn ? " torn" : "")}
      data-screen-label={"Receipt " + snack.id}
    >
      <div
        className="tear-grip"
        onPointerDown={onGripDown}
        onPointerMove={onGripMove}
        onPointerUp={onGripUp}
        onPointerCancel={onGripUp}
        title="Pull down to tear off"
      >&#9986; pull to tear</div>
      <div className="receipt-grain" aria-hidden="true" />
      <button className="receipt-x" onClick={onRemove} title="Remove receipt">&times;</button>
      <div className="receipt-body">
        <div className="r-line r-center r-store" style={L()}>SNACK&nbsp;PRINT&nbsp;CO&#8322;&nbsp;GROCER</div>
        <div className="r-line r-center r-sub" style={L()}>carbon till receipt &middot; modelled</div>
        <div className="r-rule" style={L()} />
        <div className="r-line r-name" style={L()}>{snack.name}</div>
        <div className="r-line r-meta" style={L()}>
          <span>{snack.sku}</span><span>{snack.cat}</span>
        </div>
        <div className="r-line r-meta" style={L()}>
          <span>BASIS</span><span>{unitLabel(snack, unit, freq)}</span>
        </div>
        <div className="r-line r-meta" style={L()}>
          <span>REGION</span><span>{region} &middot; transport &times;{REGION_T[region]}</span>
        </div>
        <div className="r-rule dashed" style={L()} />

        <div className="r-line r-colhead" style={L()}>
          <span>LIFE-CYCLE STAGE &middot; tap a row</span><span>kg CO&#8322;e</span>
        </div>

        {STAGE_KEYS.map((k) => (
          <div className="stage-wrap" style={L()} key={k}>
            <StageRow
              snack={snack} k={k} factor={factor} accent={accent} dom={dom}
              maxShare={maxShare} region={region}
              expanded={expandedStage === k}
              onToggle={() => setExpandedStage(expandedStage === k ? null : k)}
            />
          </div>
        ))}

        <div className="r-rule" style={L()} />
        <div className="r-line r-total" style={L()}>
          <span>TOTAL</span>
          <span className="r-total-val">{f.num}<span className="r-total-unit">&nbsp;{f.unit}</span></span>
        </div>
        <div className="r-line r-meta r-dom" style={L()}>
          <span>DOMINANT</span>
          <span style={{ color: accent }}>&#9733; {domStage.short} ({Math.round((stageVal(snack, dom, region) / totalRaw) * 100)}%)</span>
        </div>

        {swap && (
          <div className="r-swap" style={L()}>
            <span className="r-swap-k">CASHIER SUGGESTS</span>
            <span className="r-swap-v">
              {swap.snack.name} <em style={{ color: accent }}>&minus;{swap.pct}%</em> &middot; same aisle
            </span>
          </div>
        )}

        <div className="r-rule dashed" style={L()} />
        <div className="r-line r-eqhead" style={L()}>THAT&#39;S ABOUT EQUIVALENT TO</div>
        <div className="r-line r-equiv" style={L()}>
          <span>{fmtNum(carKm)}</span><span>{EQUIV.car_km.label}</span>
        </div>
        <div className="r-line r-equiv" style={L()}>
          <span>{fmtNum(showers)}</span><span>{EQUIV.showers.label}</span>
        </div>

        <div className="r-rule dashed" style={L()} />
        <div className="bc-block" style={L()}>
          <Barcode
            snack={snack} accent={accent} dom={dom} region={region}
            decoded={decoded} onToggle={() => setDecoded(!decoded)}
          />
        </div>

        <div className="r-line r-foot" style={L()}>{METHODOLOGY}</div>
        <div className="r-line r-center r-ts" style={L()}>{ts}</div>
        <div className="r-line r-center r-thanks" style={L()}>* * *  thank you for snacking responsibly  * * *</div>

        <div className="r-actions">
          <button className="r-act" onClick={doCopy}>{copied ? "COPIED \u2713" : "COPY TXT"}</button>
          <button className="r-act" onClick={doPrint}>PRINT PAPER</button>
        </div>
      </div>
      <div className="receipt-perf bottom" aria-hidden="true" />
    </div>
  );
}

Object.assign(window, { Receipt, Barcode });
