// src/middleware/verifyJwt.mjs
import jwt from "jsonwebtoken";

const verifyJwt = () => {
  return {
    before: async (request) => {
      const authHeader =
        request.event.headers?.Authorization ||
        request.event.headers?.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized: No token provided");
      }

      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.event.auth = decoded; // Lägg decoded payload i eventet
      } catch (err) {
        console.error("JWT verification failed:", err);
        throw new Error("Unauthorized: Invalid token");
      }
    },
  };
};

export default verifyJwt;
