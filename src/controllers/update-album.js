module.exports = function makeGetTracksController({ formatResponse, getTracks }) {
  return async function getTracksController(req, res) {
    try {
      // Extract query parameters
      const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;
      const authHeader = req.headers.authorization;

      // Extract the token from the Authorization header
      const token = authHeader ? authHeader.split(' ')[1] : null;

      // Call the use case to fetch tracks
      const result = await getTracks({ limit, offset, artist_id, album_id, hidden, token });

      // Return success response
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
        data: result.data,
      }));
    } catch (err) {
      console.error('Error in getTracksController:', err);

      // Handle errors and send appropriate HTTP responses
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
