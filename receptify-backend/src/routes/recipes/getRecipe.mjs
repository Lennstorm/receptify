// src/routes/recipes/getRecipe.mjs
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import middy from "@middy/core";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const getRecipe = async (event) => {
  try {
    const { recipeId } = event.pathParameters; // enbart recipeId i URL
    const userId = event.auth.userId; // från JWT

    if (!recipeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Recipe ID is required" }),
      };
    }

    const params = {
      TableName: process.env.RECIPES_TABLE,
      Key: {
        recipeId: { S: recipeId },
        userId: { S: userId },
      },
    };

    const { Item } = await dynamodb.send(new GetItemCommand(params));

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Recipe not found" }),
      };
    }

    // Exempel för att "bygga" steps

    const recipe = {
      recipeId: Item.recipeId.S,
      userId: Item.userId.S,
      title: Item.title.S,
      category: Item.category.S,
      createdAt: Item.createdAt.S,
      ingredients: (Item.ingredients.L || []).map((i) => ({
        amount: parseFloat(i.M.amount.N),
        unit: i.M.unit.S,
        name: i.M.name.S,
      })),
      steps: (Item.steps.L || []).map((s) => ({
        text: s.M.text.S,
        ingredients: (s.M.ingredients.L || []).map((ing) => ({
          amount: parseFloat(ing.M?.amount?.N) || null,
          unit: ing.M?.unit?.S || null,
          name: ing.M?.name?.S || null,
        })),
      })),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(recipe),
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(getRecipe)
  //.use(rateLimiter()) // inaktiverad
  .use(verifyJwt())
  .use(addCorsHeader());
