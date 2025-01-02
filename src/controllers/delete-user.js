module.exports = function makeDeleteUserController({ formatResponse, deleteUser }) {
    return async function deleteUserController(req, res) {
      try {
        const { id } = req.params; // Extract user ID from request parameters
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
  
        // Call the use case to delete the user and get the response
        const result = await deleteUser({ user_id:id, token });
  
        // Send the response with the status code and message from the use case
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
          data: null,
          error: null,
        }));
      } catch (err) {
        console.error('Error in deleteUserController:', err);
  
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
          data: null,
          error: null,
        }));
      }
    };
  };
  