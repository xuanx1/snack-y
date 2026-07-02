# Snack Print

A "carbon till" for 100+ everyday snacks. Pick items off a virtual shelf, drop them on the till, and a printer-style receipt breaks down the modelled CO₂e by life-cycle stage (agriculture, processing, packaging, transport, retail) with regional transport adjustments and everyday equivalences (km driven, hot showers).

> Carbon values are **modelled teaching estimates** built on the structure of Poore & Nemecek (2018, *Science*) life-cycle emission factors crossed with Open Food Facts category patterns. They are not measurements of any specific commercial product.

Visual defaults (grain, accent, paper tint, default unit) live in the `T` constant near the top of [app.jsx](app.jsx). Stage definitions are in `STAGES` in [data.js](data.js); regional transport multipliers are in `REGION_T` in [util.js](util.js).

## Adding a snack

1. Append an entry to `SNACKS` in [data.js](data.js) — set `stages` in kg CO₂e per 100 g.
2. Drop a thumbnail at `thumbs/<id>.jpg` (or `.png`/`.webp`).
3. Add the matching line to [thumbs.js](thumbs.js).

The shelf groups by `cat` automatically.
