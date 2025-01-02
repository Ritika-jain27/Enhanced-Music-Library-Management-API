module.exports = function makeGetAlbumsController({ formatResponse, getAllAlbums }) {
  return async function getAlbumsController(req, res) {
    try {
      // Extract query parameters for pagination and filtering
      const { limit = 5, offset = 0, artist_id = null, hidden = null } = req.query;
      const authHeader = req.headers.authorization;

      // Get the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to get albums
      const result = await getAllAlbums({ limit, offset, artist_id, hidden, token });

      // Return response using the status and message from the use case
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
        data: result.data || null,
      }));
    } catch (err) {
      console.error('Error in getAlbumsController:', err);

      // Handle errors and return appropriate status and message
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
