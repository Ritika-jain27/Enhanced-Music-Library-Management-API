module.exports = function makeGetUsersController({ formatResponse, getAllUsers }) {
  return async function getUsersController(req, res) {
    try {
      // Extract query parameters for pagination and filtering
      const { limit = 5, offset = 0, role = null } = req.query;
      const authHeader = req.headers.authorization;

      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to get users
      const result = await getAllUsers({ limit, offset, role, token });

      // Return response using the status and message from the use case
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
        data: result.data || null,
      }));
    } catch (err) {
      console.error('Error in getUsersController:', err);

      // Return appropriate error response
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
