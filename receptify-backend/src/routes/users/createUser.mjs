// src/routes/users/createUser.mjs
import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import addCorsHeader from "../../middleware/corsHeader.mjs";
// import rateLimiter from "../../middleware/rateLimiter.mjs"; // Inaktiverad
import { hashPassword } from "../../utils/hashPassword.mjs";

const dynamodb = new DynamoDBClient({
  region: "eu-north-1",
});

const createUser = async (event) => {
  try {
    const { email, name, password } = event.body;

    if (!email || !name || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Email, name och password krävs.",
        }),
      };
    }

    // Kolla om e-post redan finns
    const checkParams = {
      TableName: process.env.USERS_TABLE,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    };

    const existingUser = await dynamodb.send(new QueryCommand(checkParams));

    if (existingUser.Items && existingUser.Items.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ message: "Email already registered" }),
      };
    }

    // Hasha lösenordet
    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();

    const params = {
      TableName: process.env.USERS_TABLE,
      Item: {
        userId: { S: userId },
        email: { S: email },
        name: { S: name },
        password: { S: hashedPassword }, // Spara hash
        createdAt: { S: new Date().toISOString() },
      },
    };

    await dynamodb.send(new PutItemCommand(params));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created", userId }),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

export const handler = middy(createUser)
  .use(httpJsonBodyParser())
  // .use(rateLimiter()) // inaktiverad
  .use(addCorsHeader());
