// src/middleware/rateLimiter.mjs
/* 
const rateLimits = new Map();

const rateLimiter = (limit = 10, timeWindow = 60000) => {
  return {
    before: async (request) => {
      const ip = request.event.requestContext?.identity?.sourceIp || "unknown";

      if (!rateLimits.has(ip)) {
        rateLimits.set(ip, []);
      }

      const timestamps = rateLimits.get(ip);
      const now = Date.now();

      // Rensa gamla anrop utanför tidsfönstret
      while (timestamps.length && timestamps[0] < now - timeWindow) {
        timestamps.shift();
      }

      if (timestamps.length >= limit) {
        throw new Error("Rate limit exceeded. Try again later.");
      }

      timestamps.push(now);
    },
  };
};

export default rateLimiter;
 */
