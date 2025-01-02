module.exports = function makeAddFavoriteController({ formatResponse, addFavorite }) {
    return async function addFavoriteController(req, res) {
      try {
        const { category, item_id } = req.body;
        const authHeader = req.headers.authorization;
  
        // Geting the token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Calling the use case to add the favorite
        const result = await addFavorite({ category, item_id , token});
  
        // Return success response
        return res.status(201).json(formatResponse({
          status: 201,
          message: result.message,
        }));
      } catch (err) {
        console.error('Error in addFavoriteController:', err);
  
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  