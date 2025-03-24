// src/routes/recipes/updateRecipe.mjs
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const updateRecipe = async (event) => {
  try {
    const userId = event.auth.userId;
    const { recipeId } = event.pathParameters; // enbart recipeId
    const { title, category, ingredients, steps } = event.body;

    if (!recipeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Recipe ID krävs." }),
      };
    }

    if (!title && !category && !ingredients && !steps) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Minst ett fält måste uppdateras." }),
      };
    }

    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    if (title) {
      updateExpression.push("#t = :title");
      expressionAttributeValues[":title"] = { S: title };
      expressionAttributeNames["#t"] = "title";
    }
    if (category) {
      updateExpression.push("#c = :category");
      expressionAttributeValues[":category"] = { S: category };
      expressionAttributeNames["#c"] = "category";
    }
    if (ingredients) {
      updateExpression.push("#i = :ingredients");
      expressionAttributeValues[":ingredients"] = {
        L: ingredients.map((i) => ({
          M: {
            amount: { N: i.amount.toString() },
            unit: { S: i.unit },
            name: { S: i.name },
          },
        })),
      };
      expressionAttributeNames["#i"] = "ingredients";
    }
    if (steps) {
      updateExpression.push("#s = :steps");
      expressionAttributeValues[":steps"] = {
        L: steps.map((s) => ({
          M: {
            text: { S: s.text },
            ingredients: {
              L: s.ingredients.map((iName) => ({ S: iName })),
            },
          },
        })),
      };
      expressionAttributeNames["#s"] = "steps";
    }

    const params = {
      TableName: process.env.RECIPES_TABLE,
      Key: {
        recipeId: { S: recipeId },
        userId: { S: userId },
      },
      UpdateExpression: `SET ${updateExpression.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamodb.send(new UpdateItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Recept uppdaterat.",
        updatedAttributes: result.Attributes,
      }),
    };
  } catch (error) {
    console.error("Error updating recipe:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internt serverfel",
        error: error.message,
      }),
    };
  }
};

export const handler = middy(updateRecipe)
  .use(httpJsonBodyParser())
  .use(verifyJwt())
  .use(addCorsHeader());
