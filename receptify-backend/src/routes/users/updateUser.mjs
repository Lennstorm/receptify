// src/routes/users/updateUser.mjs
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import verifyJwt from "../../middleware/verifyJwt.mjs";
import addCorsHeader from "../../middleware/corsHeader.mjs";

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const updateUser = async (event) => {
  try {
    const userId = event.auth.userId;
    const { email, name } = event.body;

    if (!email && !name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Minst ett fält (email eller name) krävs.",
        }),
      };
    }

    const updateExpression = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    if (email) {
      updateExpression.push("email = :email");
      expressionAttributeValues[":email"] = { S: email };
    }
    if (name) {
      updateExpression.push("#nameAttr = :name");
      expressionAttributeValues[":name"] = { S: name };
      expressionAttributeNames["#nameAttr"] = "name";
    }

    const params = {
      TableName: process.env.USERS_TABLE,
      Key: { userId: { S: userId } },
      UpdateExpression: `SET ${updateExpression.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: "ALL_NEW",
    };

    await dynamodb.send(new UpdateItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Användare uppdaterad." }),
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internt serverfel" }),
    };
  }
};

export const handler = middy(updateUser)
  .use(httpJsonBodyParser())
  .use(verifyJwt())
  .use(addCorsHeader());
