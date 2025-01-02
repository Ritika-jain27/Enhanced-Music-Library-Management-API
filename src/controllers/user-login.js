module.exports = function makeUserLogin({ formatResponse, userLogin }) {
    return async function createLoginUser(req, res) {
      try {
        const { email, password } = req.body;
  
        // Input validation
        if (!email || !password) {
          const missingField = !email ? 'email' : 'password';
          return res.status(400).json(formatResponse({
            status: 400,
            message: `Bad Request, Reason: ${missingField} is required`,
            data: null,
            error: null,
          }));
        }
  
        // Call user login service
        const result = await userLogin({ body: { email, password } });
  
        // Send success response
        return res.status(200).json(formatResponse({
          status: 200,
          message: 'Login successful.',
          data: result, // contains token
          error: null,
        }));
  
      } catch (err) {
        console.error("Error in user login:", err);
  
        // Error-specific responses
        let status = 500;
        let message = 'Internal Server Error';
  
        if (err.message === 'User not found') {
          status = 404;
          message = 'User not found.';
        } else if (err.message === 'Invalid credentials') {
          status = 401;
          message = 'Invalid credentials.';
        }
  
        return res.status(status).json(formatResponse({
          status,
          message,
          data: null,
          error: null,
        }));
      }
    };
  };
  