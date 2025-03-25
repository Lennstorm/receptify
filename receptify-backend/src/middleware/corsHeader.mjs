// src/middleware/corsHeader.mjs

const addCorsHeader = () => {
  return {
    before: async (request) => {
      if (!request.response) {
        request.response = {
          statusCode: 200,
          headers: {},
          body: "",
        };
      }

      request.response.headers = {
        ...request.response.headers,
        "Access-Control-Allow-Origin": "*", // Ändras vid behov!
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };
    },
  };
};

export default addCorsHeader;
