/* Snack Print — Basket (combined receipt) + League table (till roll) */

function BasketView({ basket, setBasket, region, accent, sound }) {
  const ids = Object.keys(basket).filter((id) => basket[id] > 0);
  const items = ids.map((id) => ({
    snack: SNACKS.find((s) => s.id === id),
    qty: basket[id],
  }));

  const annual = (snack, qty) => snackTotal(snack, region) * (snack.serving / 100) * qty * 52;
  const stageAnnual = (k) => items.reduce((sum, it) =>
    sum + stageVal(it.snack, k, region) * (it.snack.serving / 100) * it.qty * 52, 0);

  const grand = items.reduce((s, it) => s + annual(it.snack, it.qty), 0);
  const dom = STAGE_KEYS.reduce((b, k) => (stageAnnual(k) > stageAnnual(b) ? k : b), STAGE_KEYS[0]);
  const maxStage = Math.max(...STAGE_KEYS.map(stageAnnual), 1e-9);
  const f = fmtCO2(grand);

  const setQty = (id, q) => {
    setBasket((cur) => {
      const next = Object.assign({}, cur);
      if (q <= 0) delete next[id]; else next[id] = q;
      return next;
    });
  };

  if (!items.length) {
    return (
      <div className="rail-empty">
        <div className="rail-empty-bc" aria-hidden="true" />
        <div className="rail-empty-txt">
          BASKET EMPTY<br />
          <span>Tap ADD on shelf items to build your weekly shop. Quantities are servings per week.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="receipt basket-receipt" data-screen-label="Basket receipt">
      <div className="receipt-grain" aria-hidden="true" />
      <div className="receipt-body">
        <div className="r-line r-center r-store">SNACK&nbsp;PRINT&nbsp;CO&#8322;&nbsp;GROCER</div>
        <div className="r-line r-center r-sub">your weekly shop &middot; annualised &middot; modelled</div>
        <div className="r-rule" />
        <div className="r-line r-meta">
          <span>ITEMS {items.length}</span>
          <span>REGION {region}</span>
          <span>kg CO&#8322;e / YEAR</span>
        </div>
        <div className="r-rule dashed" />

        {items.map(({ snack, qty }) => {
          const a = annual(snack, qty);
          const fa = fmtCO2(a);
          return (
            <div className="bk-item" key={snack.id}>
              <div className="bk-row">
                <span className="bk-name">{snack.name}</span>
                <span className="bk-val">{fa.num}<small>&nbsp;{fa.unit}</small></span>
              </div>
              <div className="bk-row bk-sub">
                <span className="bk-qty">
                  <button className="bk-btn" onClick={() => setQty(snack.id, qty - 1)}>&minus;</button>
                  <em>{qty}&times;/wk</em>
                  <button className="bk-btn" onClick={() => setQty(snack.id, qty + 1)}>+</button>
                </span>
                <span className="bk-serving">{snack.serving} g serving</span>
              </div>
            </div>
          );
        })}

        <div className="r-rule" />
        <div className="r-line r-total">
          <span>GRAND TOTAL</span>
          <span className="r-total-val">{f.num}<span className="r-total-unit">&nbsp;{f.unit}/yr</span></span>
        </div>
        <div className="r-rule dashed" />
        <div className="r-line r-colhead"><span>WHERE IT COMES FROM</span><span></span></div>
        {STAGE_KEYS.map((k) => {
          const v = stageAnnual(k);
          const fv = fmtCO2(v);
          const isDom = k === dom;
          return (
            <div className="stage-wrap" key={k}>
              <div className={"stage-row" + (isDom ? " is-dom" : "")}>
                <div className="stage-head">
                  <span className="stage-name">
                    {isDom && <span className="dom-star" style={{ color: accent }}>&#9733;</span>}
                    {STAGES.find((s) => s.key === k).short}
                  </span>
                  <span className="stage-val">{fv.num}<span className="stage-unit">&nbsp;{fv.unit}</span></span>
                </div>
                <div className="stage-bar-track">
                  <div className="stage-bar-fill" style={{ width: (v / maxStage) * 100 + "%", background: isDom ? accent : "var(--ink)" }} />
                  <span className="stage-pct">{grand ? Math.round((v / grand) * 100) : 0}%</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="r-rule dashed" />
        <div className="r-line r-eqhead">A YEAR OF THIS BASKET &asymp;</div>
        <div className="r-line r-equiv">
          <span>{fmtNum(grand / EQUIV.car_km.perUnit)}</span><span>{EQUIV.car_km.label}</span>
        </div>
        <div className="r-line r-equiv">
          <span>{fmtNum(grand / EQUIV.showers.perUnit)}</span><span>{EQUIV.showers.label}</span>
        </div>
        <div className="r-rule dashed" />
        <div className="r-line r-foot">{METHODOLOGY}</div>
        <div className="r-actions">
          <button className="r-act" onClick={() => setBasket({})}>EMPTY BASKET</button>
        </div>
      </div>
    </div>
  );
}

function LeagueView({ unit, freq, region, accent, onAdd }) {
  const rows = SNACKS
    .map((s) => ({ s, t: snackTotal(s, region) * unitFactor(s, unit, freq) }))
    .sort((a, b) => b.t - a.t);
  const max = rows[0].t;
  return (
    <div className="receipt league-roll" data-screen-label="League table">
      <div className="receipt-grain" aria-hidden="true" />
      <div className="receipt-body">
        <div className="r-line r-center r-store">CARBON&nbsp;LEAGUE&nbsp;TABLE</div>
        <div className="r-line r-center r-sub">
          all {rows.length} snacks &middot; {unit === "100g" ? "per 100 g" : unit === "serving" ? "per serving" : "per year, " + freq + "\u00d7/wk"} &middot; region {region}
        </div>
        <div className="r-rule" />
        <div className="r-line r-colhead"><span>RANK &middot; tap to put on till</span><span>kg CO&#8322;e</span></div>
        <div className="lg-rows">
          {rows.map(({ s, t }, i) => {
            const ft = fmtCO2(t);
            const dom = dominantStage(s, region);
            return (
              <div className="lg-row" key={s.id} onClick={() => onAdd(s)} title={"Print " + s.name}>
                <span className="lg-rank">{String(i + 1).padStart(3, "0")}</span>
                <span className="lg-name">
                  <span className="lg-dom" style={{ color: accent }} title={"Dominant: " + dom}>&#9733;</span>
                  {s.name}
                </span>
                <span className="lg-bar"><i style={{ width: Math.max(2, (t / max) * 100) + "%" }} /></span>
                <span className="lg-val">{ft.num}<small>&nbsp;{ft.unit}</small></span>
              </div>
            );
          })}
        </div>
        <div className="r-rule dashed" />
        <div className="r-line r-foot">{METHODOLOGY}</div>
      </div>
    </div>
  );
}

Object.assign(window, { BasketView, LeagueView });
