// src/routes/users/loginUser.mjs
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { generateJwt } from "../../utils/generateJwt.mjs";
import bcrypt from "bcryptjs";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import addCorsHeader from "../../middleware/corsHeader.mjs";
// import addCspHeader from "../../middleware/cspHeader.mjs"; // borttagen
// import rateLimiter from "../../middleware/rateLimiter.mjs"; // inaktiverad

const dynamodb = new DynamoDBClient({ region: "eu-north-1" });

const loginUser = async (event) => {
  try {
    const { email, password } = event.body;

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email och lösenord krävs." }),
      };
    }

    const params = {
      TableName: process.env.USERS_TABLE,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    };

    const { Items } = await dynamodb.send(new QueryCommand(params));

    if (!Items || Items.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Felaktig e-post eller lösenord." }),
      };
    }

    const user = unmarshall(Items[0]);

    // Jämför inskickat lösenord med sparad hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Felaktig e-post eller lösenord." }),
      };
    }

    const token = generateJwt(user.userId, user.email);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Inloggning lyckades.",
        token,
        userId: user.userId,
        email: user.email,
      }),
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internt serverfel" }),
    };
  }
};

export const handler = middy(loginUser)
  .use(httpJsonBodyParser())
  // .use(rateLimiter()) // inaktiverad
  .use(addCorsHeader());
