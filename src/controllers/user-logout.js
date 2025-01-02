module.exports = function makeLogoutController({ formatResponse, logoutUser }) {
    return async function logoutController(req, res) {
      try {
        // Extract Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(400).json(formatResponse({
            status: 400,
            message: 'Bad Request, Authorization token is required.',
            data: null,
            error: null,
          }));
        }
  
        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
          return res.status(400).json(formatResponse({
            status: 400,
            message: 'Bad Request, Token is missing.',
            data: null,
            error: null,
          }));
        }
  
        // Call the logout user use case
        const result = await logoutUser({ token });
  
        // Return success response
        return res.status(200).json(formatResponse({
          status: 200,
          message: result.message,
          data: null,
          error: null,
        }));
      } catch (err) {
        console.error('Error in logoutController:', err);
  
        // Handle invalid token or other errors
        return res.status(400).json(formatResponse({
          status: 400,
          message: 'Bad Request, Invalid or expired token.',
          data: null,
          error: null,
        }));
      }
    };
  };
  