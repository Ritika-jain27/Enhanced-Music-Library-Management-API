module.exports = function makeGetUsers({ usersDB, jwt, secretKey }) {
  return async function getUsers({ token, limit = 5, offset = 0, role = null }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);
      console.info('Decoded role:', decoded.role);

      // Ensure only admins can access this functionality
      if (decoded.role !== 'admin') {
        return {
          status: 401,
          message: 'Unauthorized Access',
        };
      }

      // Fetch users from the database
      const users = await usersDB.getUsers({ limit, offset, role });

      return {
        status: 200,
        message: 'Users retrieved successfully.',
        data: users,
      };
    } catch (error) {
      console.error('Error in getUsers:', error);

      // Handle unexpected errors and return a consistent response
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };
};
