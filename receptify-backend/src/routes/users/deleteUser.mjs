// src/routes/users/deleteUser.mjs
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import middy from "@middy/core";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const deleteUser = async (event) => {
  try {
    const userId = event.auth.userId;

    const params = {
      TableName: process.env.USERS_TABLE,
      Key: { userId: { S: userId } },
    };

    await dynamodb.send(new DeleteItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Användare raderad." }),
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internt serverfel" }),
    };
  }
};

export const handler = middy(deleteUser).use(verifyJwt()).use(addCorsHeader());
