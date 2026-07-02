/* Snack Print — Shelf + package tiles (filterable, till/basket aware) */

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function SnackTile({ snack, onAction, active, locked, mode, basketQty }) {
  let cta;
  if (mode === "basket") {
    cta = basketQty ? "IN BASKET " + basketQty + "\u00d7 \u002b" : "ADD \u25b8";
  } else {
    cta = active ? "ON TILL \u2713" : locked ? "TILL FULL" : "PRINT \u25b8";
  }
  const isLocked = mode !== "basket" && locked;
  return (
    <div className={"tile" + (active || basketQty ? " active" : "") + (isLocked ? " locked" : "")}>
      <div className="pk" style={{ "--pk": snack.color }}>
        <img
          className="pk-slot"
          src={thumbUrl(snack)}
          alt=""
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
        <div className="pk-scrim" aria-hidden="true"></div>
        <div className="pk-overlay">
          <div className="pk-band">
            <span className="pk-net">NET&nbsp;100g</span>
            <span className="pk-mini-bc" aria-hidden="true"></span>
          </div>
          <div className="pk-spacer"></div>
          <div className="pk-name">{snack.name}</div>
          <div className="pk-tag">{snack.tag}</div>
          <div className="pk-foot"><span className="pk-sku">{snack.sku}</span></div>
        </div>
        <div className="pk-shine" aria-hidden="true"></div>
      </div>
      <button
        className="tile-cta"
        onClick={() => onAction(snack)}
        disabled={isLocked}
        title={isLocked ? "Till is full \u2014 clear one to print this" : snack.name}
      >{cta}</button>
    </div>
  );
}

function Shelf({ snacks, onAction, activeIds, atCapacity, mode, basket }) {
  // group by category, preserving first-appearance order
  const groups = [];
  const byCat = {};
  snacks.forEach((s) => {
    if (!byCat[s.cat]) { byCat[s.cat] = []; groups.push(s.cat); }
    byCat[s.cat].push(s);
  });
  if (!snacks.length) {
    return (
      <div className="shelf-empty">NO MATCHES &mdash; try a different search or filter</div>
    );
  }
  return (
    <div className="shelf">
      {groups.map((cat) => (
        <div className="aisle" key={cat} data-screen-label={"Aisle " + cat}>
          <div className="aisle-label">
            <span className="aisle-name">{cat.toUpperCase()}</span>
            <span className="aisle-count">{byCat[cat].length}</span>
          </div>
          {chunk(byCat[cat], 2).map((row, ri) => (
            <section className="shelf-section" key={ri}>
              <div className="shelf-tiles">
                {row.map((s) => (
                  <SnackTile
                    key={s.id}
                    snack={s}
                    onAction={onAction}
                    active={activeIds.includes(s.id)}
                    locked={atCapacity && !activeIds.includes(s.id)}
                    mode={mode}
                    basketQty={basket[s.id] || 0}
                  />
                ))}
              </div>
              <div className="shelf-board" aria-hidden="true"></div>
            </section>
          ))}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Shelf, SnackTile });
