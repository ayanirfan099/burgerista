export const brand = {
  name: "BURGERISTA",
  slogan: "WIR LEBEN BURGER.",
  official: "https://www.burgerista.com/",
  menu: "https://www.burgerista.com/speisekarte/",
  locations: "https://www.burgerista.com/standorte/",
  language: "de-AT",
  timezone: "Europe/Vienna",
};
export const navigation = [
  ["Speisekarte", "menu"],
  ["Burger Experience", "experience"],
  ["Standorte", "locations"],
  ["Über uns", "about"],
  ["FAQ", "faq"],
] as const;
export type Category = "Alle" | "Beef" | "Chicken" | "Veggie";
export type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "Alle">;
  description: string;
  image: string;
  price: number | null;
  previousPrice?: number;
  ingredients: string[];
  allergens: string | null;
  vegetarian: boolean;
  availability: "Unbestätigt";
  promotion?: string;
  orderUrl: string;
};
// Names supplied by the project brief. Recipes, allergens, prices and availability await owner verification.
export const products: Product[] = [
  [
    "classic",
    "Classic",
    "Beef",
    "Der Name ist Programm. Entdecke deinen nächsten Burger-Moment.",
  ],
  [
    "lord-bacon",
    "Lord Bacon",
    "Beef",
    "Für alle, die es herzhaft mögen. Ein Name mit Charakter.",
  ],
  [
    "big-bbq",
    "Big BBQ Bang",
    "Beef",
    "Großer Name. Große Vorfreude. Dein nächster BBQ-Moment.",
  ],
  [
    "meisterstueck",
    "Meisterstück",
    "Beef",
    "Für deinen ganz persönlichen Genussmoment.",
  ],
  [
    "vib-beef",
    "V.I.B. Beef",
    "Beef",
    "Very Important Burger. Entdecke die Beef-Auswahl.",
  ],
  [
    "vib-chicken",
    "V.I.B. Chicken",
    "Chicken",
    "Abwechslung gefällig? Entdecke die Chicken-Auswahl.",
  ],
  [
    "superveggie",
    "Superveggie",
    "Veggie",
    "Die Veggie-Auswahl entdecken. Rezeptur bitte vor Ort prüfen.",
  ],
  [
    "favorista",
    "Favorista Double",
    "Beef",
    "Doppelte Vorfreude auf deinen Favoriten.",
  ],
  ["feuerwerk", "Feuerwerk", "Beef", "Ein Burgername, der neugierig macht."],
  [
    "cheeseburger",
    "Cheeseburger’ista",
    "Beef",
    "Ein Klassiker mit BURGERISTA im Namen.",
  ],
  ["hamburger", "Hamburger’ista", "Beef", "Zurück zum Burger-Moment."],
].map(([id, name, category, description]) => ({
  id,
  name,
  category: category as Product["category"],
  description,
  image: "/burger.svg",
  price: null,
  ingredients: [],
  allergens: null,
  vegetarian: category === "Veggie",
  availability: "Unbestätigt",
  orderUrl: brand.menu,
}));
export const categories: Category[] = ["Alle", "Beef", "Chicken", "Veggie"];
export function filterProducts(category: Category) {
  return products.filter((p) => category === "Alle" || p.category === category);
}
export const stages = [
  [
    "Gute Zutaten. Guter Anfang.",
    "Alles beginnt mit dem, was zwischen die Buns kommt. Diese Illustration zeigt unsere Vorstellung vom Burger-Moment.",
    "Die Zutaten",
  ],
  [
    "Mit Liebe vorbereitet.",
    "Ein guter Burger verdient Aufmerksamkeit. Vom ersten Handgriff bis zum letzten Topping.",
    "Die Vorbereitung",
  ],
  [
    "Jetzt wird’s heiß.",
    "Das Grillen: der Moment, in dem aus Vorfreude echter Burger-Appetit wird.",
    "Der Grill",
  ],
  [
    "Vorfreude auf voller Flamme.",
    "Goldene Röstaromen als visuelle Inspiration. Die tatsächliche Zubereitung erfährst du im Restaurant.",
    "Der Moment",
  ],
  [
    "Mehr Farbe. Mehr Charakter.",
    "Käse, knackiges Grün und deine liebsten Toppings machen den Unterschied.",
    "Die Toppings",
  ],
  [
    "Schicht für Schicht Liebe.",
    "Alles kommt zusammen. Dein Lieblingsmoment nimmt Form an.",
    "Der Aufbau",
  ],
  [
    "Dein BURGERISTA Moment.",
    "Jetzt fehlt nur noch eins: du. Entdecke die offizielle Speisekarte und finde deinen Favoriten.",
    "Der erste Biss",
  ],
] as const;
export const builderOptions = {
  base: ["Sesam-Bun", "Brioche-Stil"],
  patty: ["Beef-Stil", "Veggie-Stil"],
  cheese: ["Mit Käse", "Ohne Käse"],
  toppings: ["Salat", "Tomate", "Zwiebel"],
  sauce: ["BBQ-Stil", "Burger-Sauce"],
} as const;
export const faqs = [
  [
    "Wo finde ich BURGERISTA Restaurants?",
    "Alle bestätigten Adressen und Restaurantdetails findest du in der offiziellen Standortübersicht. Unsere Standortsektion führt dich direkt dorthin.",
  ],
  [
    "Kann ich online bestellen?",
    "Bestellmöglichkeiten können je Restaurant variieren. Wähle dein Restaurant auf der offiziellen BURGERISTA Website und prüfe dort die verfügbaren Angebote.",
  ],
  [
    "Wo finde ich die aktuelle Speisekarte?",
    "Die offizielle Speisekarte ist auf burgerista.com/speisekarte/ verfügbar. Produkte auf dieser Konzeptseite sind eine Auswahl aus dem Projektbrief; Preise und Verfügbarkeit sind nicht bestätigt.",
  ],
  [
    "Gibt es vegetarische Produkte?",
    "Superveggie ist in diesem Konzept der Veggie-Auswahl zugeordnet. Bitte prüfe die aktuelle Rezeptur und Verfügbarkeit sowie deine Ernährungsanforderungen direkt beim Restaurant.",
  ],
  [
    "Wo finde ich Informationen zu Allergenen?",
    "Bitte nutze die offizielle Speisekarte oder frage direkt im Restaurant nach aktuellen Allergeninformationen. Wir veröffentlichen hier keine unbestätigten Allergenangaben.",
  ],
  [
    "Wie erfahre ich Öffnungszeiten und aktuelle Angebote?",
    "Öffnungszeiten, Kontakt und eventuelle Aktionen prüfst du am besten direkt über die offizielle Standortübersicht. Auf dieser Konzeptseite werden keine unbestätigten Angebote oder Bewertungen angezeigt.",
  ],
] as const;
export const sourceNote =
  "Unoffizielles Redesign-Konzept. Keine Bestellplattform. Produktnamen aus dem Projektbrief; Rezepturen, Preise und Standorte sind nicht live verifiziert.";
export const locations: {
  id: string;
  city: string;
  region: string;
  address: string;
  hours: string;
  directionsUrl: string;
  orderUrl?: string;
}[] = [];

// Empty until owner-approved campaigns, genuine reviews and actual social/app destinations exist.
export type Promotion = {
  id: string;
  title: string;
  description: string;
  image: string;
  expiresAt: string | null;
  url: string;
};
export type Review = {
  id: string;
  author: string;
  quote: string;
  sourceUrl: string;
  rating: number | null;
};
export const promotions: Promotion[] = [];
export const reviews: Review[] = [];
export const socialLinks: { label: string; url: string }[] = [];
export const appLinks: { label: string; url: string }[] = [];
