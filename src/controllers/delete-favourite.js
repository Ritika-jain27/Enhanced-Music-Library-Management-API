module.exports = function makeRemoveFavoriteController({ removeFavorite }) {
    return async function removeFavoriteController(req, res) {
      try {
        const { favorite_id } = req.params; // Extract favorite_id from URL
        const authHeader = req.headers.authorization;
  
        // Extract token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Call the use case
        const result = await removeFavorite({ favorite_id, token });
  
        // Send response to client
        return res.status(result.status).json({
          status: result.status,
          message: result.message,
        });
      } catch (error) {
        console.error('Error in removeFavoriteController:', error);
        return res.status(500).json({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    };
  };
  