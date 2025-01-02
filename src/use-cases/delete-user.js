module.exports = function makeDeleteUser({ usersDB, jwt, secretKey }) {
    return async function deleteUser({ user_id, token }) {
      try {
        // Verify the token and decode the user data
        const decoded = jwt.verify(token, secretKey);
        console.info('decoded ' + decoded.role);
  
        // Check if the user is an Admin
        if (decoded.role !== 'admin') {
          return {
            status: 403,
            message: 'Forbidden Access/Operation not allowed.',
          };
        }
  
        // Check if user exists
        const user = await usersDB.getUserById({ user_id });

        if (!user) {
          return {
            status: 404,
            message: 'User not found.',
          };
        }

        if (user.role === 'admin') {
            return {
              status: 403,
              message: 'Forbidden Access/Operation not allowed.',
            };
          }
  
        // Delete the user from the database
        await usersDB.deleteUser({ user_id });
  
        return {
          status: 200,
          message: 'User deleted successfully.',
        };
      } catch (error) {
        console.error('Error in deleteUser:', error);
        return {
          status: 500,
          message: 'Internal Server Error',
        };
      }
    };
  };
  