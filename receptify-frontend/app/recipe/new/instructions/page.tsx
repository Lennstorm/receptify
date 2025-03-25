// app/recipe/new/instructions/page.tsx   --- sidan där man lägger in instruktioner under skapande av recept

"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/ui/pageHeader";
import { PageFooter } from "@/ui/pageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}

interface RecipeData {
  title: string;
  category: string;
  portions: string;
  ingredients: Ingredient[];
}

export default function InstructionsPage() {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [steps, setSteps] = useState<string[]>([""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const lastFocusedStep = useRef<number>(0);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("newRecipeIngredients");
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.ingredients = parsed.ingredients.filter(
        (ing: Ingredient) => ing.name.trim() !== ""
      );
      setRecipe(parsed);
    }
  }, []);

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStep = () => {
    setSteps((prev) => [...prev, ""]);
    setTimeout(() => {
      const nextIndex = steps.length;
      inputRefs.current[nextIndex]?.focus();
    }, 0);
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const insertIngredient = (ingredientIndex: number) => {
    const stepIndex = lastFocusedStep.current;
    const input = inputRefs.current[stepIndex];
    if (!input) return;

    const { selectionStart, selectionEnd } = input;
    const current = steps[stepIndex];
    const placeholder = `{{${ingredientIndex}}}`;
    const updated =
      current.slice(0, selectionStart ?? 0) +
      placeholder +
      current.slice(selectionEnd ?? 0);
    handleStepChange(stepIndex, updated);
    input.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "Tab" && !e.shiftKey && index === steps.length - 1) {
      e.preventDefault();
      addStep();
    }
  };

  const handleSaveRecipe = () => {
    if (!recipe) return;

    const stepsWithRefs = steps.map((step) => {
      const ingredientIndices = [...step.matchAll(/\{\{(\d+)\}\}/g)].map((m) =>
        Number(m[1])
      );

      const usedIngredients = ingredientIndices
        .map((idx) => recipe.ingredients[idx]?.name)
        .filter(Boolean);

      return {
        raw: step,
        ingredients: usedIngredients,
      };
    });

    const newRecipe = {
      id: uuidv4(),
      userId: "user1",
      title: recipe.title,
      category: recipe.category,
      portions: Number(recipe.portions),
      ingredients: recipe.ingredients.map((ing) => ({
        ...ing,
        amount: Number(ing.amount),
      })),
      steps: stepsWithRefs,
      createdAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem("savedRecipes");
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(newRecipe);
    localStorage.setItem("savedRecipes", JSON.stringify(parsed));

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-thistle">
      <PageHeader />

      <div className="flex-1 w-full flex justify-center p-4">
        <div className="w-full max-w-7xl bg-white p-6 rounded-xl shadow-md space-y-6">
          <h1 className="text-2xl font-semibold text-center">Skriv instruktioner</h1>

          {recipe && (
            <div className="text-center text-gray-700">
              <p className="font-medium">{recipe.title}</p>
              <p className="text-sm">
                Kategori: {recipe.category} | Portioner: {recipe.portions}
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {/* Ingredienser */}
            <div className="bg-gray-100 p-4 rounded-md flex-1 md:max-w-sm">
              <h2 className="text-lg font-medium mb-2">Ingredienser</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {recipe?.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span>🥄</span>
                    <span>{`${ing.amount} ${ing.unit} ${ing.name}`}</span>
                  </div>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {recipe?.ingredients.map((ing, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => insertIngredient(i)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    + {ing.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Instruktioner */}
            <div className="space-y-4 flex-1">
              <h2 className="text-lg font-medium">Instruktioner</h2>

              {steps.map((step, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder={`Steg ${i + 1}`}
                      value={step}
                      onFocus={() => (lastFocusedStep.current = i)}
                      onChange={(e) => handleStepChange(i, e.target.value)}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                    />

                    <button
                      onClick={() => handleStepChange(i, "")}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="text-xl text-gray-500 hover:text-gray-700"
                      title="Rensa"
                    >
                      🧹
                    </button>

                    {steps.length > 1 && (
                      <button
                        onClick={() => removeStep(i)}
                        className="text-2xl text-red-500 px-2"
                        title="Ta bort steg"
                      >
                        &minus;
                      </button>
                    )}
                  </div>

                  {/* Preview */}
                  <Input
                    readOnly
                    className="bg-gray-100 text-gray-600"
                    value={
                      recipe?.ingredients
                        ? step.replace(/\{\{(\d+)\}\}/g, (_, idx) =>
                            recipe.ingredients[Number(idx)]
                              ? `${recipe.ingredients[Number(idx)].amount} ${recipe.ingredients[Number(idx)].unit} ${recipe.ingredients[Number(idx)].name}`
                              : "???"
                          )
                        : step
                    }
                  />
                </div>
              ))}

              <button
                onClick={addStep}
                className="text-secondary text-lg hover:text-secondary/80 mt-4"
              >
                + Lägg till steg
              </button>
            </div>
          </div>

          <Button className="w-full mt-6" onClick={handleSaveRecipe}>
            Spara instruktioner
          </Button>

          {savedMessage && (
            <p className="text-green-600 text-sm text-center mt-2">
              Recept sparat!
            </p>
          )}
        </div>
      </div>

      <PageFooter />
    </main>
  );
}
