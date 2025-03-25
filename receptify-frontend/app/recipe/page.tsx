// app/recipe/page.tsx  ---  sidan som visar alla recept

"use client";

import { useEffect, useState } from "react";
import { mockRecipes } from "@/lib/mockRecipes";
import { useRouter } from "next/navigation";
import type { Recipe } from "@/lib/types";
import { PageHeader } from "@/ui/pageHeader";
import { PageFooter } from "@/ui/pageFooter";

export default function AllRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("savedRecipes");
    const localRecipes = saved ? JSON.parse(saved) : [];

    const combined = [...mockRecipes, ...localRecipes];
    setRecipes(combined);
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full bg-thistle">
      <PageHeader />

      <div className="flex-1 w-full flex justify-center p-4">
        <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Alla recept</h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => router.push(`/recipe/${recipe.id}`)}
                className="bg-gray-100 rounded-lg p-4 text-left hover:bg-gray-200 shadow"
              >
                <h2 className="font-semibold text-lg">{recipe.title}</h2>
                <p className="text-sm text-gray-600">{recipe.category}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {recipe.ingredients.length} ingredienser
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <PageFooter />
    </main>
  );
}
