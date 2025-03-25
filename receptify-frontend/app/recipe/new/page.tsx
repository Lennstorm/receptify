// app/recipe/new/page.tsx  - skapa nytt recept

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/ui/pageHeader";
import { PageFooter } from "@/ui/pageFooter";
import { useRouter } from "next/navigation";

interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}

export default function CreateRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [portions, setPortions] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { amount: "", unit: "", name: "" },
    { amount: "", unit: "", name: "" },
    { amount: "", unit: "", name: "" },
  ]);

  const addIngredientRow = () => {
    setIngredients((prev) => [...prev, { amount: "", unit: "", name: "" }]);
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "Tab" && !e.shiftKey && index === ingredients.length - 1) {
      e.preventDefault();
      addIngredientRow();
    }
  };

  const handleSave = () => {
    const filteredIngredients = ingredients.filter(
      (ing) => ing.name.trim() !== ""
    );

    const recipeData = {
      title,
      category,
      portions,
      ingredients: filteredIngredients,
    };

    localStorage.setItem("newRecipeIngredients", JSON.stringify(recipeData));
    setSavedMessage(true);

    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-thistle">
      <PageHeader />

      <div className="flex-1 flex justify-center items-start p-4">
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md space-y-6">
          <h1 className="text-2xl font-semibold text-center">Skapa nytt recept</h1>

          {/* Grundläggande fält */}
          <div className="space-y-4">
            <Input
              placeholder="Receptnamn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              placeholder="Antal portioner"
              value={portions}
              onChange={(e) => setPortions(e.target.value)}
            />
          </div>

          {/* Ingredienslista */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Ingredienser</h2>

            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Antal"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  inputMode="numeric"
                />
                <Input
                  placeholder="Enhet"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                />
                <Input
                  placeholder="Ingrediens"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />

                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setIngredients((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="text-2xl text-red-500 px-2"
                    title="Ta bort raden"
                  >
                    &minus;
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    handleIngredientChange(index, "amount", "");
                    handleIngredientChange(index, "unit", "");
                    handleIngredientChange(index, "name", "");
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="text-xl px-2 text-gray-500 hover:text-gray-700"
                  title="Rensa raden"
                >
                  🧹
                </button>
              </div>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={addIngredientRow}
                className="text-2xl text-secondary hover:text-secondary/80"
                title="Lägg till ny ingrediensrad"
              >
                + Lägg till ingrediens
              </button>
            </div>
          </div>

          {/* Knappar */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 mt-4">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Spara ingredienser
            </Button>

            <Button
              onClick={() => {
                handleSave();
                router.push("/recipe/new/instructions");
              }}
              className="w-full sm:w-auto"
            >
              Skapa instruktioner
            </Button>
          </div>

          {savedMessage && (
            <p className="text-green-600 text-sm text-center mt-2">
              Ingredienser sparade!
            </p>
          )}
        </div>
      </div>

      <PageFooter />
    </main>
  );
}
