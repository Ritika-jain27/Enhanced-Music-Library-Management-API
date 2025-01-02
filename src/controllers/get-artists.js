module.exports = function makeGetArtistsController({ formatResponse, getAllArtists }) {
    return async function getArtistsController(req, res) {
      try {
        // Extract query parameters for pagination and filtering
        const { limit = 5, offset = 0, grammy = null, hidden = null } = req.query;
        const authHeader = req.headers.authorization;
  
        // Extract token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Call the use case to get artists
        const result = await getAllArtists({ limit, offset, grammy, hidden, token });
        console.info('result + ', result);
  
        // Return the response based on the status
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
          data: result.artists || null,
          error: null,
        }));
      } catch (err) {
        console.error('Unexpected error in getArtistsController:', err);
  
        // Handle unexpected server errors
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
          data: null,
          error: null,
        }));
      }
    };
  };
  