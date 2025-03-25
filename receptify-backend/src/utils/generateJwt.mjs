// src/utils/generateJwt.mjs
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

export const generateJwt = (userId, email) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "2h" });
};
