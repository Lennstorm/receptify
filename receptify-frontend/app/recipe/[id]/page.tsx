  // app/recipe/[id]/page.tsx  -- sida som visar specifikt, klickat recept

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mockRecipes } from "@/lib/mockRecipes";
import type { Recipe } from "@/lib/types";
import { PageHeader } from "@/ui/pageHeader";
import { PageFooter } from "@/ui/pageFooter";
import { Input } from "@/components/ui/input";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [portionCount, setPortionCount] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const stored = localStorage.getItem("savedRecipes");
    const local = stored ? JSON.parse(stored) : [];

    const combined: Recipe[] = [...mockRecipes, ...local];
    const found = combined.find((r) => r.id === id);

    if (found) {
      setRecipe(found);
      setPortionCount(found.portions);
    }
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setCompletedSteps(Array(recipe.steps.length).fill(false));
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <main className="p-4">
        <p className="text-center text-red-500">Receptet kunde inte hittas.</p>
      </main>
    );
  }

  const factor = portionCount / recipe.portions;

  const scaledAmount = (amount: number) =>
    Math.round(amount * factor * 100) / 100;

  const updateTextWithPortions = (text: string) =>
    text.replace(/\{\{(\d+)\}\}/g, (_, idx) => {
      const ing = recipe.ingredients[Number(idx)];
      if (!ing) return "???";
      return `${scaledAmount(ing.amount)} ${ing.unit} ${ing.name}`;
    });

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-thistle">
      <PageHeader />

      <div className="flex-1 w-full flex justify-center p-4">
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-4">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p className="text-gray-600">Kategori: {recipe.category}</p>
          <p className="text-gray-500 text-sm">
            Skapad: {new Date(recipe.createdAt).toLocaleString()}
          </p>

          {/* Portioner */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Antal portioner
            </label>
            <div className="flex items-center gap-2 max-w-[140px]">
              <button
                onClick={() => setPortionCount((prev) => Math.max(prev - 1, 1))}
                className="px-1 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                aria-label="Minska portioner"
              >
                −
              </button>
              <Input
                type="number"
                value={portionCount}
                onChange={(e) =>
                  setPortionCount(Math.max(1, Number(e.target.value)))
                }
                className="text-center"
              />
              <button
                onClick={() => setPortionCount((prev) => prev + 1)}
                className="px-1 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                aria-label="Öka portioner"
              >
                +
              </button>
            </div>
          </div>

          {/* Ingredienser */}
          <section>
            <h2 className="font-semibold mt-4">Ingredienser</h2>
            <ul className="mt-1 text-sm text-gray-700 space-y-1">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>🥄</span>
                  <span>
                    {scaledAmount(ing.amount)} {ing.unit} {ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Instruktioner */}
          <section>
            <h2 className="font-semibold mt-6">Instruktioner</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {recipe.steps.map((step, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-2 ${
                    completedSteps[idx] ? "opacity-40" : ""
                  } transition-opacity`}
                >
                  <button
                    onClick={() => toggleStep(idx)}
                    className={`w-5 h-5 flex items-center justify-center border rounded-full text-xs font-bold ${
                      completedSteps[idx]
                        ? "bg-green-400 text-white"
                        : "bg-white"
                    }`}
                    aria-label={`Markera steg ${idx + 1}`}
                  >
                    {completedSteps[idx] ? "✓" : idx + 1}
                  </button>
                  <span>{updateTextWithPortions(step.raw)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <PageFooter />
    </main>
  );
}
