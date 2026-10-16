import GEO from "@/data/moroccoGeo";

// Initial view (includes Dakhla in the south and Tangier in the north) and panning limits.
export const MOROCCO_BOUNDS = [[21.2, -17.6], [36.3, -0.8]];
export const MAX_BOUNDS = [[17, -26], [42, 8]];

const toLatLngs = (flat) => {
  const out = [];
  for (let i = 0; i < flat.length; i += 2) out.push([flat[i + 1], flat[i]]);
  return out;
};
const { ma, ...neighbours } = GEO;
export const MOROCCO_RINGS = ma.map(toLatLngs);
export const NEIGHBOUR_RINGS = Object.values(neighbours).flat().map(toLatLngs);

export const MAP_FILTERS = [
  { id: "all", key: "mf_all", test: () => true },
  { id: "culture", key: "mf_culture", test: (c) => ["historic", "lively", "artistic", "modern"].includes(c.atmos) || c.id === "rabat" },
  { id: "coast", key: "mf_coast", test: (c) => c.atmos === "coastal" || c.ratings.beaches >= 4 },
  { id: "desert", key: "mf_desert", test: (c) => c.atmos === "desert" },
  { id: "mountains", key: "mf_mountains", test: (c) => c.atmos === "alpine" || ["chefchaouen", "azilal"].includes(c.id) },
];

// Cities on the Atlantic coast get their label on the sea side to avoid crowding.
export const LABEL_LEFT = new Set(["asilah", "casablanca", "rabat", "essaouira", "agadir", "taghazout", "dakhla"]);

export const MAP_LABELS = [
  { id: "atlantic", pos: [30.4, -13.8], cls: "sea", text: { en: "Atlantic Ocean", fr: "Océan Atlantique", ar: "المحيط الأطلسي" } },
  { id: "med", pos: [36.05, -2.2], cls: "sea", text: { en: "Mediterranean Sea", fr: "Mer Méditerranée", ar: "البحر الأبيض المتوسط" } },
  { id: "algeria", pos: [31.0, -0.4], cls: "land", text: { en: "Algeria", fr: "Algérie", ar: "الجزائر" } },
];

const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
export const matchesQuery = (city, query) => {
  const q = norm(query);
  if (!q) return true;
  return [city.name.en, city.name.fr, city.name.ar, city.region].some((s) => norm(s).includes(q));
};
