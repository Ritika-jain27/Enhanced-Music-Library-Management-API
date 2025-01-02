module.exports = function makeLogoutUser({ jwt, secretKey }) {
    return async function createLogoutUser({ token }) {
      try {
        // Verify token to ensure it's valid
        const decoded = jwt.verify(token, secretKey);
  
        // No further action needed as this is a stateless JWT implementation
        return { userId: decoded.user_id, message: 'User logged out successfully.' };
      } catch (error) {
        console.error('Error in logoutUser:', error);
        throw new Error('Invalid or expired token');
      }
    };
  };