module.exports = function makeAddUserController({ formatResponse, addUser }) {
  return async function addUserController(req, res) {
    try {
      const { email, password, role } = req.body;
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      // Call the use case to add a user
      const result = await addUser({ email, password, role, token });

      // Send the response from the use case
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
      }));
    } catch (err) {
      console.error('Error in addUserController:', err);

      // Handle errors and return appropriate status and message
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
