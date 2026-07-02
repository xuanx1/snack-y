/* Snack Print — embedded dataset
 * All carbon values are MODELLED ESTIMATES in kg CO2e per 100 g, decomposed into
 * five life-cycle stages. They are illustrative figures built on the structure of
 * Poore & Nemecek (2018, Science) life-cycle emission factors combined with the
 * product/category patterns visible in Open Food Facts. They are NOT measurements
 * of any specific commercial product. Treat as teaching estimates, not labels.
 *
 * Stages: agriculture | processing | packaging | transport | retail
 */

const STAGES = [
  { key: "agriculture", label: "Ingredients / agriculture", short: "AGRICULTURE" },
  { key: "processing",  label: "Processing / manufacturing", short: "PROCESSING" },
  { key: "packaging",   label: "Packaging",                  short: "PACKAGING" },
  { key: "transport",   label: "Transport",                  short: "TRANSPORT" },
  { key: "retail",      label: "Retail / storage",           short: "RETAIL" },
];

// kg CO2e per 100 g, by stage. serving in grams.
const SNACKS = [
  {
    id: "chocolate", name: "MILK CHOCOLATE BAR", sku: "CHOC-MLK-100",
    cat: "Confectionery", serving: 40, color: "#5b3a29", tag: "Cocoa + dairy",
    stages: { agriculture: 0.62, processing: 0.10, packaging: 0.06, transport: 0.05, retail: 0.02 },
  },
  {
    id: "crisps", name: "POTATO CRISPS", sku: "SNK-CRSP-100",
    cat: "Salty snacks", serving: 30, color: "#d8a72b", tag: "Fried + foil bag",
    stages: { agriculture: 0.10, processing: 0.14, packaging: 0.06, transport: 0.03, retail: 0.02 },
  },
  {
    id: "noodles", name: "INSTANT NOODLES", sku: "MEAL-NDL-100",
    cat: "Instant meals", serving: 85, color: "#e0a93b", tag: "Flash-fried block",
    stages: { agriculture: 0.12, processing: 0.18, packaging: 0.07, transport: 0.05, retail: 0.03 },
  },
  {
    id: "gummy", name: "GUMMY CANDY", sku: "CNDY-GUM-100",
    cat: "Confectionery", serving: 40, color: "#c8456b", tag: "Sugar + gelatin",
    stages: { agriculture: 0.09, processing: 0.05, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "biscuits", name: "BUTTER BISCUITS", sku: "BAKE-BSC-100",
    cat: "Biscuits", serving: 25, color: "#caa15a", tag: "Wheat + butter",
    stages: { agriculture: 0.13, processing: 0.08, packaging: 0.05, transport: 0.02, retail: 0.02 },
  },
  {
    id: "icecream", name: "VANILLA ICE CREAM", sku: "FRZ-ICE-100",
    cat: "Frozen", serving: 65, color: "#cfc6b0", tag: "Dairy + cold chain",
    stages: { agriculture: 0.34, processing: 0.10, packaging: 0.04, transport: 0.03, retail: 0.04 },
  },
  {
    id: "cheesepuffs", name: "CHEESE PUFFS", sku: "SNK-PUF-100",
    cat: "Salty snacks", serving: 28, color: "#e08a2c", tag: "Corn + cheese",
    stages: { agriculture: 0.15, processing: 0.13, packaging: 0.07, transport: 0.03, retail: 0.02 },
  },
  {
    id: "energybar", name: "NUT ENERGY BAR", sku: "BAR-NRG-100",
    cat: "Cereal bars", serving: 50, color: "#8a5a32", tag: "Nuts + whey",
    stages: { agriculture: 0.30, processing: 0.08, packaging: 0.07, transport: 0.03, retail: 0.02 },
  },
  {
    id: "bubbletea", name: "BUBBLE TEA", sku: "DRK-BBT-100",
    cat: "Drinks", serving: 350, color: "#b5895f", tag: "Milk + tapioca",
    stages: { agriculture: 0.18, processing: 0.05, packaging: 0.05, transport: 0.01, retail: 0.01 },
  },
  {
    id: "popcorn", name: "MICROWAVE POPCORN", sku: "SNK-POP-100",
    cat: "Salty snacks", serving: 30, color: "#e7d49a", tag: "Corn + butter",
    stages: { agriculture: 0.10, processing: 0.06, packaging: 0.05, transport: 0.02, retail: 0.02 },
  },
  {
    id: "jerky", name: "BEEF JERKY", sku: "MEAT-JRK-100",
    cat: "Meat snacks", serving: 28, color: "#7a2e22", tag: "Cured beef",
    stages: { agriculture: 3.10, processing: 0.20, packaging: 0.10, transport: 0.05, retail: 0.05 },
  },
  {
    id: "pretzels", name: "SALTED PRETZELS", sku: "BAKE-PRZ-100",
    cat: "Salty snacks", serving: 30, color: "#b07b3a", tag: "Baked wheat",
    stages: { agriculture: 0.11, processing: 0.05, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "driedmango", name: "DRIED MANGO", sku: "FRT-MNG-100",
    cat: "Dried fruit", serving: 40, color: "#e9962b", tag: "Imported, tropical",
    stages: { agriculture: 0.15, processing: 0.08, packaging: 0.05, transport: 0.10, retail: 0.02 },
  },
  {
    id: "granola", name: "HONEY GRANOLA", sku: "CRL-GRN-100",
    cat: "Cereal", serving: 45, color: "#bb8a44", tag: "Oats + nuts + honey",
    stages: { agriculture: 0.18, processing: 0.07, packaging: 0.05, transport: 0.03, retail: 0.02 },
  },
  {
    id: "ricecrackers", name: "RICE CRACKERS", sku: "SNK-RCE-100",
    cat: "Salty snacks", serving: 30, color: "#d9c9a3", tag: "Paddy rice (CH4)",
    stages: { agriculture: 0.14, processing: 0.06, packaging: 0.04, transport: 0.02, retail: 0.02 },
  },
  {
    id: "cheesesnack", name: "CHEESE & CRACKERS", sku: "DRY-CHS-100",
    cat: "Dairy snacks", serving: 28, color: "#e3b94e", tag: "Hard cheese",
    stages: { agriculture: 0.42, processing: 0.08, packaging: 0.05, transport: 0.03, retail: 0.02 },
  },
  {
    id: "tortilla", name: "TORTILLA CHIPS", sku: "SNK-TRT-100",
    cat: "Salty snacks", serving: 30, color: "#d9a441", tag: "Fried corn",
    stages: { agriculture: 0.11, processing: 0.13, packaging: 0.06, transport: 0.02, retail: 0.02 },
  },
  {
    id: "darkchoc", name: "DARK CHOCOLATE 70%", sku: "CHOC-DRK-100",
    cat: "Confectionery", serving: 40, color: "#3a2418", tag: "High cocoa",
    stages: { agriculture: 1.05, processing: 0.12, packaging: 0.07, transport: 0.04, retail: 0.02 },
  },
  {
    id: "peanuts", name: "SALTED PEANUTS", sku: "NUT-PNT-100",
    cat: "Nuts", serving: 30, color: "#c98a3e", tag: "Roasted + salted",
    stages: { agriculture: 0.40, processing: 0.07, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "seaweed", name: "ROASTED SEAWEED", sku: "SNK-SWD-100",
    cat: "Salty snacks", serving: 5, color: "#2f4a3a", tag: "Imported, light",
    stages: { agriculture: 0.08, processing: 0.07, packaging: 0.05, transport: 0.08, retail: 0.02 },
  },
  {
    id: "bananachips", name: "BANANA CHIPS", sku: "FRT-BNN-100",
    cat: "Dried fruit", serving: 30, color: "#d9b24a", tag: "Fried, imported",
    stages: { agriculture: 0.13, processing: 0.12, packaging: 0.05, transport: 0.13, retail: 0.02 },
  },
  {
    id: "marshmallows", name: "MARSHMALLOWS", sku: "CNDY-MSH-100",
    cat: "Confectionery", serving: 30, color: "#e3b9c0", tag: "Sugar + gelatin",
    stages: { agriculture: 0.10, processing: 0.06, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "mochi", name: "MOCHI BITES", sku: "CNDY-MCH-100",
    cat: "Confectionery", serving: 45, color: "#d6aebd", tag: "Rice, imported",
    stages: { agriculture: 0.16, processing: 0.08, packaging: 0.05, transport: 0.09, retail: 0.02 },
  },
  {
    id: "veggiestraws", name: "VEGGIE STRAWS", sku: "SNK-VEG-100",
    cat: "Salty snacks", serving: 28, color: "#cf6f3a", tag: "Extruded potato",
    stages: { agriculture: 0.10, processing: 0.13, packaging: 0.06, transport: 0.02, retail: 0.02 },
  },
  {
    id: "cola", name: "COLA (CAN)", sku: "DRK-COL-100",
    cat: "Drinks", serving: 330, color: "#8a2430", tag: "Sugar + aluminium can",
    stages: { agriculture: 0.04, processing: 0.03, packaging: 0.06, transport: 0.01, retail: 0.01 },
  },
  {
    id: "icelolly", name: "FRUIT ICE LOLLY", sku: "FRZ-LOL-100",
    cat: "Frozen", serving: 70, color: "#c2543f", tag: "Frozen fruit ice",
    stages: { agriculture: 0.06, processing: 0.05, packaging: 0.04, transport: 0.02, retail: 0.03 },
  },
  {
    id: "trailmix", name: "TRAIL MIX", sku: "NUT-TRL-100",
    cat: "Nuts", serving: 40, color: "#7a5a3a", tag: "Nuts + raisins",
    stages: { agriculture: 0.35, processing: 0.05, packaging: 0.05, transport: 0.04, retail: 0.01 },
  },
  {
    id: "yogurtcup", name: "STRAWBERRY YOGURT", sku: "DRY-YOG-100",
    cat: "Dairy snacks", serving: 125, color: "#c97a8e", tag: "Chilled dairy cup",
    stages: { agriculture: 0.22, processing: 0.04, packaging: 0.03, transport: 0.01, retail: 0.02 },
  },
  {
    id: "donut", name: "GLAZED DONUT", sku: "BAKE-DNT-100",
    cat: "Bakery", serving: 60, color: "#c4628f", tag: "Fried + glazed",
    stages: { agriculture: 0.18, processing: 0.12, packaging: 0.03, transport: 0.02, retail: 0.03 },
  },
  {
    id: "porkcrackling", name: "PORK CRACKLING", sku: "MEAT-PRK-100",
    cat: "Meat snacks", serving: 25, color: "#b3673a", tag: "Fried pork rind",
    stages: { agriculture: 0.95, processing: 0.12, packaging: 0.07, transport: 0.03, retail: 0.03 },
  },
  {
    id: "wasabipeas", name: "WASABI PEAS", sku: "SNK-WSB-100",
    cat: "Salty snacks", serving: 30, color: "#6f8a3f", tag: "Coated green peas",
    stages: { agriculture: 0.12, processing: 0.08, packaging: 0.04, transport: 0.03, retail: 0.01 },
  },
  {
    id: "fruitleather", name: "FRUIT LEATHER", sku: "FRT-LTH-100",
    cat: "Dried fruit", serving: 25, color: "#9c4a2e", tag: "Dehydrated pur\u00e9e",
    stages: { agriculture: 0.14, processing: 0.09, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "salami", name: "SALAMI STICKS", sku: "MEAT-SLM-100",
    cat: "Meat snacks", serving: 25, color: "#8a3a3a", tag: "Cured pork + beef",
    stages: { agriculture: 1.30, processing: 0.15, packaging: 0.08, transport: 0.04, retail: 0.03 },
  },
  {
    id: "coconutchips", name: "COCONUT CHIPS", sku: "FRT-CCO-100",
    cat: "Dried fruit", serving: 30, color: "#b89a6a", tag: "Toasted, tropical",
    stages: { agriculture: 0.13, processing: 0.10, packaging: 0.05, transport: 0.10, retail: 0.02 },
  },
  {
    id: "biscuitsticks", name: "CHOC BISCUIT STICKS", sku: "BSC-STK-100",
    cat: "Biscuits", serving: 35, color: "#c03a3a", tag: "Choc-dipped wheat",
    stages: { agriculture: 0.25, processing: 0.10, packaging: 0.06, transport: 0.03, retail: 0.01 },
  },
  {
    id: "sunflowerseeds", name: "SUNFLOWER SEEDS", sku: "NUT-SNF-100",
    cat: "Nuts", serving: 30, color: "#3a4a5a", tag: "Roasted in shell",
    stages: { agriculture: 0.16, processing: 0.04, packaging: 0.03, transport: 0.01, retail: 0.01 },
  },
  {
    id: "croissant", name: "BUTTER CROISSANT", sku: "BAKE-CRS-100",
    cat: "Bakery", serving: 65, color: "#d9a85f", tag: "Laminated butter",
    stages: { agriculture: 0.30, processing: 0.08, packaging: 0.02, transport: 0.01, retail: 0.02 },
  },
  {
    id: "muffin", name: "BLUEBERRY MUFFIN", sku: "BAKE-MUF-100",
    cat: "Bakery", serving: 110, color: "#5a4a7a", tag: "Wheat + berries",
    stages: { agriculture: 0.16, processing: 0.09, packaging: 0.03, transport: 0.02, retail: 0.02 },
  },
  {
    id: "brownie", name: "CHOCOLATE BROWNIE", sku: "BAKE-BRW-100",
    cat: "Bakery", serving: 60, color: "#4a2e1e", tag: "Cocoa + butter",
    stages: { agriculture: 0.28, processing: 0.08, packaging: 0.03, transport: 0.02, retail: 0.02 },
  },
  {
    id: "cottoncandy", name: "COTTON CANDY", sku: "CNDY-CTN-100",
    cat: "Confectionery", serving: 30, color: "#d687b8", tag: "Spun sugar",
    stages: { agriculture: 0.06, processing: 0.07, packaging: 0.05, transport: 0.01, retail: 0.01 },
  },
  {
    id: "lollipop", name: "LOLLIPOP", sku: "CNDY-LOL-100",
    cat: "Confectionery", serving: 12, color: "#7a3a8a", tag: "Wrapped, on stick",
    stages: { agriculture: 0.07, processing: 0.04, packaging: 0.05, transport: 0.01, retail: 0.01 },
  },
  {
    id: "chewinggum", name: "CHEWING GUM", sku: "CNDY-CHW-100",
    cat: "Confectionery", serving: 14, color: "#4a9a8a", tag: "Gum base + blister",
    stages: { agriculture: 0.05, processing: 0.08, packaging: 0.07, transport: 0.01, retail: 0.01 },
  },
  {
    id: "proteinshake", name: "PROTEIN SHAKE RTD", sku: "DRK-PRO-100",
    cat: "Drinks", serving: 330, color: "#5a5a62", tag: "Dairy whey, chilled",
    stages: { agriculture: 0.20, processing: 0.05, packaging: 0.05, transport: 0.02, retail: 0.02 },
  },
  {
    id: "juicebox", name: "ORANGE JUICE BOX", sku: "DRK-OJX-100",
    cat: "Drinks", serving: 200, color: "#d97a2b", tag: "Composite carton",
    stages: { agriculture: 0.10, processing: 0.04, packaging: 0.05, transport: 0.03, retail: 0.02 },
  },
  {
    id: "hummus", name: "HUMMUS SNACK PACK", sku: "DIP-HUM-100",
    cat: "Dips", serving: 90, color: "#c9b88a", tag: "Chickpea + plastic pot",
    stages: { agriculture: 0.10, processing: 0.05, packaging: 0.06, transport: 0.02, retail: 0.02 },
  },
  {
    id: "shrimpcrackers", name: "SHRIMP CRACKERS", sku: "SNK-SHR-100",
    cat: "Salty snacks", serving: 30, color: "#d98a6a", tag: "Shrimp + tapioca",
    stages: { agriculture: 0.18, processing: 0.10, packaging: 0.05, transport: 0.05, retail: 0.02 },
  },
  {
    id: "sesamesnaps", name: "SESAME SNAPS", sku: "BAR-SSM-100",
    cat: "Cereal bars", serving: 30, color: "#a07828", tag: "Sesame + honey",
    stages: { agriculture: 0.20, processing: 0.05, packaging: 0.04, transport: 0.03, retail: 0.01 },
  },
  {
    id: "churros", name: "CHURROS (FROZEN)", sku: "FRZ-CHU-100",
    cat: "Frozen", serving: 75, color: "#b5722e", tag: "Fried dough, frozen",
    stages: { agriculture: 0.14, processing: 0.11, packaging: 0.04, transport: 0.02, retail: 0.04 },
  },
  {
    id: "applechips", name: "APPLE CHIPS", sku: "FRT-APL-100",
    cat: "Dried fruit", serving: 25, color: "#6a9a3a", tag: "Dehydrated, local",
    stages: { agriculture: 0.08, processing: 0.08, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "waferbar", name: "CHOC WAFER BAR", sku: "CHOC-WFR-100",
    cat: "Confectionery", serving: 45, color: "#7a4a2a", tag: "Wafer + milk choc",
    stages: { agriculture: 0.30, processing: 0.10, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "puddingcup", name: "CHOC PUDDING CUP", sku: "DES-PUD-100",
    cat: "Chilled desserts", serving: 110, color: "#6a4632", tag: "Dairy, chilled",
    stages: { agriculture: 0.20, processing: 0.05, packaging: 0.04, transport: 0.01, retail: 0.03 },
  },
  {
    id: "ricepudding", name: "RICE PUDDING POT", sku: "DES-RCE-100",
    cat: "Chilled desserts", serving: 120, color: "#bfae8e", tag: "Rice + dairy",
    stages: { agriculture: 0.18, processing: 0.04, packaging: 0.04, transport: 0.01, retail: 0.03 },
  },
  {
    id: "toasterpastry", name: "TOASTER PASTRY", sku: "BRK-TST-100",
    cat: "Breakfast pastries", serving: 50, color: "#c75a70", tag: "Frosted, filled",
    stages: { agriculture: 0.14, processing: 0.09, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "pancakebites", name: "PANCAKE BITES", sku: "BRK-PNC-100",
    cat: "Breakfast pastries", serving: 80, color: "#caa052", tag: "Wheat + syrup",
    stages: { agriculture: 0.16, processing: 0.10, packaging: 0.04, transport: 0.02, retail: 0.03 },
  },
  {
    id: "proteinballs", name: "PROTEIN BALLS", sku: "PRO-BLL-100",
    cat: "Protein snacks", serving: 40, color: "#56483a", tag: "Dates + nuts + whey",
    stages: { agriculture: 0.32, processing: 0.06, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "proteincookie", name: "PROTEIN COOKIE", sku: "PRO-CKE-100",
    cat: "Protein snacks", serving: 55, color: "#6b5340", tag: "Whey + oats",
    stages: { agriculture: 0.22, processing: 0.08, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "fruitpouch", name: "FRUIT PUR\u00c9E POUCH", sku: "BBY-PCH-100",
    cat: "Baby & kids", serving: 90, color: "#88b04a", tag: "Composite pouch",
    stages: { agriculture: 0.10, processing: 0.05, packaging: 0.07, transport: 0.02, retail: 0.01 },
  },
  {
    id: "minicakes", name: "MINI RICE CAKES", sku: "BBY-RCE-100",
    cat: "Baby & kids", serving: 20, color: "#ddc6a8", tag: "Puffed rice",
    stages: { agriculture: 0.12, processing: 0.05, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "olives", name: "OLIVE SNACK PACK", sku: "PKL-OLV-100",
    cat: "Pickles & olives", serving: 30, color: "#5a6b3a", tag: "Brined, in pouch",
    stages: { agriculture: 0.15, processing: 0.04, packaging: 0.06, transport: 0.03, retail: 0.01 },
  },
  {
    id: "pickles", name: "PICKLE SNACK PACK", sku: "PKL-CUC-100",
    cat: "Pickles & olives", serving: 40, color: "#3f7a4f", tag: "Fermented cucumber",
    stages: { agriculture: 0.08, processing: 0.05, packaging: 0.06, transport: 0.02, retail: 0.01 },
  },
  {
    id: "seededcrackers", name: "SEEDED CRACKERS", sku: "CRK-SED-100",
    cat: "Crackers", serving: 30, color: "#9a7a4a", tag: "Multigrain + seeds",
    stages: { agriculture: 0.13, processing: 0.06, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "crispbread", name: "RYE CRISPBREAD", sku: "CRK-RYE-100",
    cat: "Crackers", serving: 25, color: "#7d6b52", tag: "Baked rye",
    stages: { agriculture: 0.10, processing: 0.05, packaging: 0.03, transport: 0.01, retail: 0.01 },
  },
  // ——— restock to 100 ———
  {
    id: "maccheese", name: "INSTANT MAC & CHEESE", sku: "MEAL-MAC-100",
    cat: "Instant meals", serving: 70, color: "#d99a2b", tag: "Cheese powder cup",
    stages: { agriculture: 0.20, processing: 0.12, packaging: 0.07, transport: 0.03, retail: 0.02 },
  },
  {
    id: "misosoup", name: "INSTANT MISO SOUP", sku: "MEAL-MSO-100",
    cat: "Instant meals", serving: 20, color: "#8a6a4a", tag: "Freeze-dried, imported",
    stages: { agriculture: 0.08, processing: 0.07, packaging: 0.06, transport: 0.05, retail: 0.01 },
  },
  {
    id: "congee", name: "CUP RICE PORRIDGE", sku: "MEAL-CNG-100",
    cat: "Instant meals", serving: 60, color: "#c8b890", tag: "Rice cup, just add water",
    stages: { agriculture: 0.14, processing: 0.08, packaging: 0.06, transport: 0.04, retail: 0.02 },
  },
  {
    id: "toffee", name: "BUTTER TOFFEE", sku: "CNDY-TFE-100",
    cat: "Confectionery", serving: 30, color: "#9a6a2a", tag: "Butter + sugar",
    stages: { agriculture: 0.15, processing: 0.06, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "whitechoc", name: "WHITE CHOC BAR", sku: "CHOC-WHT-100",
    cat: "Confectionery", serving: 40, color: "#e8ddc2", tag: "Cocoa butter + dairy",
    stages: { agriculture: 0.55, processing: 0.10, packaging: 0.06, transport: 0.04, retail: 0.02 },
  },
  {
    id: "onionrings", name: "ONION RING SNACK", sku: "SNK-ONR-100",
    cat: "Salty snacks", serving: 28, color: "#ba8a28", tag: "Extruded + fried",
    stages: { agriculture: 0.09, processing: 0.13, packaging: 0.06, transport: 0.02, retail: 0.02 },
  },
  {
    id: "cornnuts", name: "CORN NUTS", sku: "SNK-CRN-100",
    cat: "Salty snacks", serving: 30, color: "#d2a23a", tag: "Toasted corn",
    stages: { agriculture: 0.10, processing: 0.09, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "digestives", name: "DIGESTIVE BISCUITS", sku: "BSC-DIG-100",
    cat: "Biscuits", serving: 30, color: "#b58a52", tag: "Wholemeal wheat",
    stages: { agriculture: 0.14, processing: 0.07, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "shortbread", name: "SHORTBREAD", sku: "BSC-SHB-100",
    cat: "Biscuits", serving: 30, color: "#d9bc7a", tag: "One-third butter",
    stages: { agriculture: 0.22, processing: 0.06, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "frozenwaffles", name: "FROZEN WAFFLES", sku: "FRZ-WFL-100",
    cat: "Frozen", serving: 70, color: "#c08a3a", tag: "Toaster-ready",
    stages: { agriculture: 0.14, processing: 0.09, packaging: 0.04, transport: 0.02, retail: 0.04 },
  },
  {
    id: "mochiicecream", name: "MOCHI ICE CREAM", sku: "FRZ-MCH-100",
    cat: "Frozen", serving: 50, color: "#cfa6c2", tag: "Rice shell + dairy",
    stages: { agriculture: 0.28, processing: 0.09, packaging: 0.05, transport: 0.05, retail: 0.05 },
  },
  {
    id: "flapjack", name: "FLAPJACK BAR", sku: "BAR-FLP-100",
    cat: "Cereal bars", serving: 60, color: "#b08038", tag: "Oats + golden syrup",
    stages: { agriculture: 0.18, processing: 0.06, packaging: 0.04, transport: 0.01, retail: 0.01 },
  },
  {
    id: "fruitnutbar", name: "FRUIT & NUT BAR", sku: "BAR-FNT-100",
    cat: "Cereal bars", serving: 40, color: "#7a4a3a", tag: "Dates + almonds",
    stages: { agriculture: 0.28, processing: 0.05, packaging: 0.05, transport: 0.03, retail: 0.01 },
  },
  {
    id: "icedcoffee", name: "ICED COFFEE CAN", sku: "DRK-COF-100",
    cat: "Drinks", serving: 240, color: "#6a4a32", tag: "Coffee + dairy",
    stages: { agriculture: 0.25, processing: 0.04, packaging: 0.06, transport: 0.02, retail: 0.02 },
  },
  {
    id: "coconutwater", name: "COCONUT WATER", sku: "DRK-CNW-100",
    cat: "Drinks", serving: 330, color: "#3e8a7a", tag: "Tropical, carton",
    stages: { agriculture: 0.08, processing: 0.03, packaging: 0.05, transport: 0.06, retail: 0.01 },
  },
  {
    id: "chickenbites", name: "CHICKEN BITES", sku: "MEAT-CKN-100",
    cat: "Meat snacks", serving: 30, color: "#c27a4a", tag: "Dried chicken",
    stages: { agriculture: 0.55, processing: 0.10, packaging: 0.06, transport: 0.03, retail: 0.02 },
  },
  {
    id: "raisins", name: "RAISINS", sku: "FRT-RSN-100",
    cat: "Dried fruit", serving: 30, color: "#5a3a4a", tag: "Sun-dried grapes",
    stages: { agriculture: 0.12, processing: 0.04, packaging: 0.03, transport: 0.02, retail: 0.01 },
  },
  {
    id: "apricots", name: "DRIED APRICOTS", sku: "FRT-APR-100",
    cat: "Dried fruit", serving: 40, color: "#e0883a", tag: "Sulphured, imported",
    stages: { agriculture: 0.13, processing: 0.05, packaging: 0.03, transport: 0.04, retail: 0.01 },
  },
  {
    id: "cornflakes", name: "CORN FLAKES", sku: "CRL-FLK-100",
    cat: "Cereal", serving: 30, color: "#d9a02b", tag: "Rolled + toasted corn",
    stages: { agriculture: 0.10, processing: 0.07, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "chocpuffs", name: "CHOC PUFFS CEREAL", sku: "CRL-CHC-100",
    cat: "Cereal", serving: 30, color: "#5a3525", tag: "Extruded + cocoa",
    stages: { agriculture: 0.14, processing: 0.08, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "muesli", name: "MUESLI", sku: "CRL-MSL-100",
    cat: "Cereal", serving: 45, color: "#a08a5a", tag: "Raw oats + fruit",
    stages: { agriculture: 0.16, processing: 0.04, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "stringcheese", name: "STRING CHEESE", sku: "DRY-STR-100",
    cat: "Dairy snacks", serving: 28, color: "#e8d8a8", tag: "Mozzarella stick",
    stages: { agriculture: 0.45, processing: 0.07, packaging: 0.05, transport: 0.02, retail: 0.03 },
  },
  {
    id: "yogurtdrink", name: "FRUIT YOGURT DRINK", sku: "DRY-YDR-100",
    cat: "Dairy snacks", serving: 200, color: "#d9a6b8", tag: "Chilled bottle",
    stages: { agriculture: 0.20, processing: 0.04, packaging: 0.04, transport: 0.01, retail: 0.02 },
  },
  {
    id: "cashews", name: "CASHEWS", sku: "NUT-CSH-100",
    cat: "Nuts", serving: 30, color: "#d8b88a", tag: "Roasted, imported",
    stages: { agriculture: 0.42, processing: 0.06, packaging: 0.05, transport: 0.04, retail: 0.01 },
  },
  {
    id: "pistachios", name: "PISTACHIOS", sku: "NUT-PST-100",
    cat: "Nuts", serving: 30, color: "#9aac5a", tag: "In shell, irrigated",
    stages: { agriculture: 0.38, processing: 0.05, packaging: 0.04, transport: 0.03, retail: 0.01 },
  },
  {
    id: "cinnamonroll", name: "CINNAMON ROLL", sku: "BAKE-CIN-100",
    cat: "Bakery", serving: 90, color: "#ad7240", tag: "Enriched dough",
    stages: { agriculture: 0.20, processing: 0.09, packaging: 0.03, transport: 0.01, retail: 0.02 },
  },
  {
    id: "bagelchips", name: "BAGEL CHIPS", sku: "BAKE-BGL-100",
    cat: "Bakery", serving: 30, color: "#b89a68", tag: "Twice-baked",
    stages: { agriculture: 0.11, processing: 0.09, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "guacamole", name: "GUACAMOLE CUP", sku: "DIP-GUA-100",
    cat: "Dips", serving: 60, color: "#5f7d2f", tag: "Avocado, chilled",
    stages: { agriculture: 0.18, processing: 0.04, packaging: 0.06, transport: 0.04, retail: 0.02 },
  },
  {
    id: "salsa", name: "SALSA POT", sku: "DIP-SAL-100",
    cat: "Dips", serving: 60, color: "#a83a2a", tag: "Tomato + chilli",
    stages: { agriculture: 0.08, processing: 0.04, packaging: 0.06, transport: 0.02, retail: 0.01 },
  },
  {
    id: "pannacotta", name: "PANNA COTTA POT", sku: "DES-PAN-100",
    cat: "Chilled desserts", serving: 90, color: "#e3d4b8", tag: "Cream-set",
    stages: { agriculture: 0.24, processing: 0.04, packaging: 0.04, transport: 0.01, retail: 0.03 },
  },
  {
    id: "jellycup", name: "JELLY CUP", sku: "DES-JLY-100",
    cat: "Chilled desserts", serving: 100, color: "#c24a5a", tag: "Mostly water + cup",
    stages: { agriculture: 0.05, processing: 0.04, packaging: 0.06, transport: 0.01, retail: 0.01 },
  },
  {
    id: "breakfastbiscuits", name: "BREAKFAST BISCUITS", sku: "BRK-BSC-100",
    cat: "Breakfast pastries", serving: 50, color: "#c89a4a", tag: "Cereal biscuit",
    stages: { agriculture: 0.13, processing: 0.07, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "stroopwafel", name: "WAFFLE COOKIES", sku: "BRK-WFL-100",
    cat: "Breakfast pastries", serving: 35, color: "#b07a30", tag: "Syrup-filled",
    stages: { agriculture: 0.18, processing: 0.07, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
  {
    id: "proteincrisps", name: "PROTEIN CRISPS", sku: "PRO-CRS-100",
    cat: "Protein snacks", serving: 28, color: "#4a5a6a", tag: "Extruded whey",
    stages: { agriculture: 0.18, processing: 0.11, packaging: 0.06, transport: 0.02, retail: 0.01 },
  },
  {
    id: "nutbutter", name: "NUT BUTTER SACHET", sku: "PRO-NBT-100",
    cat: "Protein snacks", serving: 32, color: "#8a6a3a", tag: "Squeeze pack",
    stages: { agriculture: 0.35, processing: 0.05, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "teethingwafers", name: "TEETHING WAFERS", sku: "BBY-TTH-100",
    cat: "Baby & kids", serving: 20, color: "#e0cdb0", tag: "Dissolving rice",
    stages: { agriculture: 0.10, processing: 0.06, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "yogurtmelts", name: "YOGURT MELTS", sku: "BBY-YGM-100",
    cat: "Baby & kids", serving: 18, color: "#e7c2cc", tag: "Freeze-dried dairy",
    stages: { agriculture: 0.25, processing: 0.10, packaging: 0.05, transport: 0.02, retail: 0.01 },
  },
  {
    id: "pickledonions", name: "PICKLED ONIONS", sku: "PKL-ONI-100",
    cat: "Pickles & olives", serving: 40, color: "#7a5a8a", tag: "Vinegar jar",
    stages: { agriculture: 0.07, processing: 0.05, packaging: 0.07, transport: 0.02, retail: 0.01 },
  },
  {
    id: "watercrackers", name: "WATER CRACKERS", sku: "CRK-WTR-100",
    cat: "Crackers", serving: 25, color: "#ddd2b8", tag: "Plain flour + water",
    stages: { agriculture: 0.09, processing: 0.05, packaging: 0.03, transport: 0.01, retail: 0.01 },
  },
  {
    id: "cheesethins", name: "CHEESE THINS", sku: "CRK-CHS-100",
    cat: "Crackers", serving: 30, color: "#d9962b", tag: "Baked cheese cracker",
    stages: { agriculture: 0.20, processing: 0.07, packaging: 0.04, transport: 0.02, retail: 0.01 },
  },
];

// Equivalence factors — modelled, kg CO2e per unit of the everyday thing.
const EQUIV = {
  car_km:  { perUnit: 0.170, label: "km driven, petrol car", note: "0.17 kg CO\u2082e / km, average petrol car" },
  showers: { perUnit: 0.500, label: "hot showers",           note: "0.5 kg CO\u2082e per 8-min electric-heated shower" },
};

// UNUSUAL DATASET 1 — Packaging material share of snack packs over time (modelled %, illustrative)
const PACKAGING_TREND = {
  years: [2000, 2005, 2010, 2015, 2020, 2025],
  plastic:   [78, 80, 79, 74, 66, 58],
  composite: [14, 13, 14, 17, 21, 24], // metallised / multi-layer laminate
  paper:     [8,  7,  7,  9,  13, 18],
};

// UNUSUAL DATASET 2 — count of common additives typically declared on the SAME snack
// category across regions (modelled, illustrative counts).
const ADDITIVES = {
  // category key -> { EU, US, ASIA }, plus example additive families
  "Salty snacks":   { EU: 3, US: 7, ASIA: 5, examples: "colours, flavour enhancers (MSG/E621), anti-caking" },
  "Confectionery":  { EU: 4, US: 8, ASIA: 6, examples: "synthetic colours, glazing agents, acidity regulators" },
  "Drinks":         { EU: 3, US: 6, ASIA: 5, examples: "sweeteners, preservatives, stabilisers" },
  "Frozen":         { EU: 2, US: 5, ASIA: 4, examples: "emulsifiers, stabilisers, colours" },
  "Cereal bars":    { EU: 3, US: 6, ASIA: 4, examples: "humectants, antioxidants, colours" },
  "Biscuits":       { EU: 2, US: 5, ASIA: 4, examples: "raising agents, emulsifiers, colours" },
  "Meat snacks":    { EU: 3, US: 5, ASIA: 5, examples: "nitrites, antioxidants, flavour enhancers" },
  "Dried fruit":    { EU: 1, US: 3, ASIA: 3, examples: "sulphites, preservatives" },
  "Nuts":           { EU: 1, US: 2, ASIA: 2, examples: "antioxidants, anti-caking agents" },
  "Bakery":         { EU: 3, US: 6, ASIA: 4, examples: "emulsifiers, preservatives, colours" },
  "Dips":           { EU: 2, US: 4, ASIA: 3, examples: "preservatives, acidity regulators" },
  "Chilled desserts":   { EU: 3, US: 5, ASIA: 4, examples: "stabilisers, colours, sweeteners" },
  "Breakfast pastries": { EU: 4, US: 7, ASIA: 5, examples: "colours, preservatives, emulsifiers" },
  "Protein snacks":     { EU: 3, US: 5, ASIA: 4, examples: "sweeteners, humectants" },
  "Baby & kids":        { EU: 1, US: 2, ASIA: 2, examples: "antioxidants (vitamin C)" },
  "Pickles & olives":   { EU: 2, US: 4, ASIA: 4, examples: "preservatives, firming agents" },
  "Crackers":           { EU: 2, US: 4, ASIA: 3, examples: "raising agents, antioxidants" },
  "Cereal":         { EU: 2, US: 4, ASIA: 3, examples: "antioxidants, colours" },
  "Dairy snacks":   { EU: 2, US: 4, ASIA: 3, examples: "preservatives, colours" },
  "Instant meals":  { EU: 4, US: 7, ASIA: 6, examples: "flavour enhancers, anti-caking, colours" },
};

const METHODOLOGY = "Modelled estimate \u00b7 structure after Poore & Nemecek 2018 (Science) \u00d7 Open Food Facts category data \u00b7 not a measured product value";

// Stage deep-dive drivers (shown when a receipt row is expanded)
const STAGE_INFO = {
  agriculture: "Growing, raising & first processing of ingredients \u2014 land use, fertiliser, livestock methane, on-farm energy. Usually the biggest slice for dairy, meat, cocoa and nuts.",
  processing: "Factory steps \u2014 milling, frying, baking, extruding, freeze-drying. Energy-intensive for fried and freeze-dried snacks.",
  packaging: "Making the pack \u2014 plastic film, laminates, aluminium, glass, board \u2014 plus filling lines. Often dominant for canned drinks and single-serve cups.",
  transport: "Moving ingredients and finished product \u2014 shipping, trucking, rarely air freight. Largest for imported tropical and chilled goods. Scaled by your region setting.",
  retail: "Storage & display \u2014 chiller and freezer cabinets, store energy. Highest for frozen and chilled lines.",
};

Object.assign(window, { STAGES, SNACKS, EQUIV, PACKAGING_TREND, ADDITIVES, METHODOLOGY, STAGE_INFO });
