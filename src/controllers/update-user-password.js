module.exports = function makeUpdatePasswordController({ formatResponse, updatePassword }) {
    return async function updatePasswordController(req, res) {
      try {
        const { old_password, new_password } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
  
        // Call the use case to update the password
        const result = await updatePassword({ old_password, new_password, token });
  
        // Handle successful password update
        if (result.status === 204) {
          return res.status(204).send();
        }
  
        // Handle error responses based on status from the use case
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
        }));
      } catch (err) {
        console.error('Error in updatePasswordController:', err);
  
        // Handle unexpected errors
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  