// lib/types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}

export interface Step {
  raw: string; // innehåller t.ex. "Blanda {{0}} med {{1}}"
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
