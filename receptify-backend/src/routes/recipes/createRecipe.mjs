// src/routes/recipes/createRecipe.mjs
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const createRecipe = async (event) => {
  try {
    const userId = event.auth.userId;
    const { title, category, ingredients, steps } = event.body;

    if (!title || !category || !ingredients || !steps) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "Alla fält är obligatoriska (title, category, ingredients, steps).",
        }),
      };
    }

    const recipeId = uuidv4();

    const formattedIngredients = ingredients.map((i) => {
      if (!i.amount || !i.unit || !i.name) {
        throw new Error(
          "Varje ingrediens måste ha 'amount', 'unit' och 'name'."
        );
      }
      return {
        M: {
          amount: { N: i.amount.toString() },
          unit: { S: i.unit },
          name: { S: i.name },
        },
      };
    });

    const formattedSteps = steps.map((s) => {
      if (!s.text || !s.ingredients) {
        throw new Error("Varje steg måste ha 'text' och 'ingredients'.");
      }

      const stepIngredients = s.ingredients.map((iName) => {
        const ingredient = ingredients.find((i) => i.name === iName);
        if (!ingredient) {
          return { M: { name: { S: iName } } };
        }
        return {
          M: {
            amount: { N: ingredient.amount.toString() },
            unit: { S: ingredient.unit },
            name: { S: ingredient.name },
          },
        };
      });

      return {
        M: {
          text: { S: s.text },
          ingredients: { L: stepIngredients },
        },
      };
    });

    const params = {
      TableName: process.env.RECIPES_TABLE,
      Item: {
        recipeId: { S: recipeId },
        userId: { S: userId },
        title: { S: title },
        category: { S: category },
        ingredients: { L: formattedIngredients },
        steps: { L: formattedSteps },
        createdAt: { S: new Date().toISOString() },
      },
    };

    await dynamodb.send(new PutItemCommand(params));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Receptet har sparats!", recipeId }),
    };
  } catch (error) {
    console.error("Error creating recipe:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internt serverfel",
        error: error.message,
      }),
    };
  }
};

export const handler = middy(createRecipe)
  .use(httpJsonBodyParser())
  .use(verifyJwt())
  .use(addCorsHeader());
