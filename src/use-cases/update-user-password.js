module.exports = function makeUpdatePassword({ usersDB, jwt, secretKey , bcrypt}) {
  return async function updatePassword({ old_password, new_password, token }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);
      console.info('decoded ' + decoded.role);

      if(decoded.role==='viewer')
      {
        return {
            status: 403,
            message: 'Forbidden Access/Operation not allowed.',
        };
      }

      // Fetch user password from DB
      const hashedPassword = await usersDB.getUserPasswordById({ user_id: decoded.user_id });
      if (!hashedPassword) {
        return {
          status: 404,
          message: 'User not found.',
        };
      }

      // Check if the old password matches the current password
      const isOldPasswordValid = await bcrypt.compare(old_password, hashedPassword);
      if (!isOldPasswordValid) {
        return {
          status: 400,
          message: 'Old password is incorrect.',
        };
      }

      // Update the password in the database
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      await usersDB.updatePassword({ user_id: decoded.user_id, new_password: hashedNewPassword });

      return {
        status: 204,
        message: 'Password updated successfully.',
      };
    } catch (error) {
      console.error('Error in updatePassword:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };
};
