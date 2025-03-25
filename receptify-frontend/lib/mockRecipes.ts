// lib/mockRecipes.ts   --  Mockdata för recept pga ej kopplat till backend

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}

export interface Step {
  raw: string;
  ingredients: string[];
}

export interface Recipe {
  id: string;
  userId: string;
  title: string;
  category: string;
  portions: number;
  ingredients: Ingredient[];
  steps: Step[];
  createdAt: string;
}

export const mockRecipes: Recipe[] = [
  {
    id: "3e30f0d3-573d-45e5-983e-62e3c1cab976",
    userId: "user1",
    title: "Pannkakor",
    category: "Mat",
    portions: 20,
    ingredients: [
      { amount: 50, unit: "g", name: "smör" },
      { amount: 8, unit: "dl", name: "mjölk" },
      { amount: 4, unit: "dl", name: "mjöl" },
      { amount: 4, unit: "st", name: "ägg" },
      { amount: 1, unit: "tsk", name: "salt" },
    ],
    steps: [
      { raw: "Smält {{0}}", ingredients: ["smör"] },
      { raw: "Blanda {{1}} och {{2}}", ingredients: ["mjölk", "mjöl"] },
      { raw: "Vispa ner {{3}}", ingredients: ["ägg"] },
      { raw: "Tillsätt {{4}}", ingredients: ["salt"] },
      { raw: "Rör ner det smälta smöret och resten av mjölken.", ingredients: [] },
    ],
    createdAt: "2025-03-25T17:41:12.643Z",
  },
  {
    id: "0fa09fc0-fb8b-4e06-9548-22ff0112e807",
    userId: "user1",
    title: "Köttfärssås",
    category: "Lunch",
    portions: 4,
    ingredients: [
      { amount: 400, unit: "g", name: "köttfärs" },
      { amount: 1, unit: "st", name: "gul lök" },
      { amount: 2, unit: "dl", name: "grädde" },
      { amount: 1, unit: "burk", name: "krossade tomater" },
      { amount: 1, unit: "tsk", name: "oregano" },
    ],
    steps: [
      { raw: "Stek {{0}} i en panna.", ingredients: ["köttfärs"] },
      { raw: "Hacka och fräs {{1}}.", ingredients: ["gul lök"] },
      { raw: "Tillsätt {{2}} och {{3}}.", ingredients: ["grädde", "krossade tomater"] },
      { raw: "Krydda med {{4}} och låt puttra.", ingredients: ["oregano"] },
    ],
    createdAt: "2025-03-22T13:00:00Z",
  },
  {
    id: "5b2a8279-3e71-4fcf-90a7-8cb4b1ad63d9",
    userId: "user1",
    title: "Grön smoothie",
    category: "Dryck",
    portions: 2,
    ingredients: [
      { amount: 1, unit: "st", name: "banan" },
      { amount: 2, unit: "dl", name: "spenat" },
      { amount: 2, unit: "dl", name: "havremjölk" },
      { amount: 1, unit: "tsk", name: "honung" },
    ],
    steps: [
      { raw: "Lägg {{0}} och {{1}} i en mixer.", ingredients: ["banan", "spenat"] },
      { raw: "Tillsätt {{2}} och {{3}}.", ingredients: ["havremjölk", "honung"] },
      { raw: "Mixa tills slätt.", ingredients: [] },
    ],
    createdAt: "2025-03-23T08:30:00Z",
  },
  {
    id: "6b170a32-90e3-4e16-b3ed-84b55a1a9de3",
    userId: "user1",
    title: "Chokladbollar",
    category: "Fika",
    portions: 15,
    ingredients: [
      { amount: 100, unit: "g", name: "smör" },
      { amount: 1, unit: "dl", name: "socker" },
      { amount: 3, unit: "dl", name: "havregryn" },
      { amount: 2, unit: "msk", name: "kakao" },
      { amount: 1, unit: "msk", name: "kaffe" },
    ],
    steps: [
      {
        raw: "Blanda {{0}}, {{1}}, {{2}}, {{3}} och {{4}} i en skål.",
        ingredients: ["smör", "socker", "havregryn", "kakao", "kaffe"],
      },
      {
        raw: "Forma bollar och rulla i kokos eller pärlsocker.",
        ingredients: [],
      },
    ],
    createdAt: "2025-03-24T15:45:00Z",
  },
  {
    id: "b9fc9447-cdfc-4cfa-9805-d5efad4a0036",
    userId: "user1",
    title: "Omelett",
    category: "Frukost",
    portions: 1,
    ingredients: [
      { amount: 2, unit: "st", name: "ägg" },
      { amount: 1, unit: "msk", name: "vatten" },
      { amount: 1, unit: "nypa", name: "salt" },
      { amount: 1, unit: "tsk", name: "smör" },
    ],
    steps: [
      { raw: "Vispa ihop {{0}}, {{1}} och {{2}}.", ingredients: ["ägg", "vatten", "salt"] },
      { raw: "Stek i {{3}} tills omeletten stelnat.", ingredients: ["smör"] },
    ],
    createdAt: "2025-03-25T07:20:00Z",
  },
];
