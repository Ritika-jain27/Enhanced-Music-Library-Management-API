module.exports = function makeAuthMiddleware({ jwt, secretKey, formatResponse }) {
  return async function authenticateAccessToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      // Check if Authorization header is present
      if (!authHeader) {
        return res.status(400).json(formatResponse({
          status: 400,
          data: null,
          message: 'Bad Request, Authorization token is required.',
          error: null,
        }));
      }

      const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
      
      if (!token) {
        return res.status(400).json(formatResponse({
          status: 400,
          data: null,
          message: 'Bad Request, Token is missing.',
          error: null,
        }));
      }

      // Verify token
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(400).json(formatResponse({
            status: 400,
            data: null,
            message: 'Bad Request, Invalid or expired token.',
            error: null,
          }));
        }

        // Attach decoded user data to the request object for further use
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
      });
    } catch (errServeror) {
      console.error("Error in authenticateAccessToken middleware:", error);

      return res.status(500).json(formatResponse({
        status: 500,
        data: null,
        message: 'Internal  Error',
        error: null,
      }));
    }
  };
};
