// src/routes/users/getUser.mjs
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import middy from "@middy/core";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";
// import addCspHeader from "../../middleware/cspHeader.mjs"; // borttagen

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const getUser = async (event) => {
  try {
    // Hämta userId från JWT
    const userId = event.auth.userId;

    // Hämta användardata ur DB
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: {
        userId: { S: userId },
      },
    };

    const { Item } = await dynamodb.send(new GetItemCommand(params));

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        userId: Item.userId.S,
        email: Item.email?.S ?? null,
        name: Item.name?.S ?? null,
        createdAt: Item.createdAt?.S ?? null,
      }),
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(getUser).use(verifyJwt()).use(addCorsHeader());
