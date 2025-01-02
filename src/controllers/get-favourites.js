module.exports = function makeGetFavoritesController({ formatResponse, getFavorites }) {
    return async function getFavoritesController(req, res) {
      try {
        const { category } = req.params; // Extract category from URL
        const { limit = 5, offset = 0 } = req.query; // Extract limit and offset from query parameters
  
        // Call the use case to retrieve the favorites
        const result = await getFavorites({ category, limit, offset });
  
        // Send the response with the formatted status and message from the use case
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
          data: result.data,
        }));
      } catch (err) {
        console.error('Error in getFavoritesController:', err);
  
        // Handle unexpected errors
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  