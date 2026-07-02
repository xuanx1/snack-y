/* Snack Print — the two "unusual dataset" side panels */

function PackagingTrendPanel() {
  const { years, plastic, composite, paper } = PACKAGING_TREND;
  return (
    <div className="panel">
      <div className="panel-kicker">UNUSUAL DATA &middot; 01</div>
      <h3 className="panel-title">Packaging material mix</h3>
      <p className="panel-desc">
        Share of snack packs by dominant pack material, 2000&ndash;2025. Rigid plastic
        is slowly ceding ground to paper-based and multi-layer composite packs.
      </p>
      <div className="trend-chart">
        {years.map((y, i) => (
          <div className="trend-col" key={y}>
            <div className="trend-stack">
              <div className="seg seg-plastic" style={{ height: plastic[i] + "%" }} title={"Plastic " + plastic[i] + "%"}>
                <span className="seg-val">{plastic[i]}</span>
              </div>
              <div className="seg seg-composite" style={{ height: composite[i] + "%" }} title={"Composite " + composite[i] + "%"} />
              <div className="seg seg-paper" style={{ height: paper[i] + "%" }} title={"Paper " + paper[i] + "%"} />
            </div>
            <div className="trend-year">&rsquo;{String(y).slice(2)}</div>
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="lg"><i className="sw seg-plastic" />Plastic</span>
        <span className="lg"><i className="sw seg-composite" />Composite</span>
        <span className="lg"><i className="sw seg-paper" />Paper</span>
      </div>
      <p className="panel-note">Modelled / illustrative shares &middot; not a market census</p>
    </div>
  );
}

function AdditivesPanel({ category, region }) {
  const cats = Object.keys(ADDITIVES);
  const cat = ADDITIVES[category] ? category : cats[0];
  const d = ADDITIVES[cat];
  const max = 8;
  const regions = [
    { k: "EU", n: d.EU },
    { k: "US", n: d.US },
    { k: "ASIA", n: d.ASIA },
  ];
  return (
    <div className="panel">
      <div className="panel-kicker">UNUSUAL DATA &middot; 02</div>
      <h3 className="panel-title">Additives by region</h3>
      <p className="panel-desc">
        Typical count of declared additives for the same snack category, by market.
        Reflects differing approval lists &amp; labelling norms.
      </p>
      <div className="addi-cat">CATEGORY &middot; <strong>{cat}</strong></div>
      <div className="addi-rows">
        {regions.map((r) => (
          <div className={"addi-row" + (region === r.k ? " on" : "")} key={r.k}>
            <span className="addi-region">{r.k}{region === r.k ? " \u25c2" : ""}</span>
            <span className="addi-dots">
              {Array.from({ length: max }).map((_, i) => (
                <i key={i} className={"dot" + (i < r.n ? " on" : "")} />
              ))}
            </span>
            <span className="addi-count">{r.n}</span>
          </div>
        ))}
      </div>
      <p className="addi-examples">Common families: {d.examples}</p>
      <p className="panel-note">Modelled / illustrative counts &middot; print a snack to switch category &middot; your region is marked</p>
    </div>
  );
}

Object.assign(window, { PackagingTrendPanel, AdditivesPanel });
