// src/routes/recipes/deleteRecipe.mjs
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import middy from "@middy/core";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const deleteRecipe = async (event) => {
  try {
    const userId = event.auth.userId;
    const { recipeId } = event.pathParameters;

    if (!recipeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Recipe ID krävs." }),
      };
    }

    const params = {
      TableName: process.env.RECIPES_TABLE,
      Key: {
        recipeId: { S: recipeId },
        userId: { S: userId },
      },
    };

    await dynamodb.send(new DeleteItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Recept raderat." }),
    };
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internt serverfel",
        error: error.message,
      }),
    };
  }
};

export const handler = middy(deleteRecipe)
  .use(verifyJwt())
  .use(addCorsHeader());
