// src/middleware/cspHeader.mjs

/* const addCspHeader = () => {
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
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; frame-src 'none';",
      };
    },
  };
};

export default addCspHeader;
 */
