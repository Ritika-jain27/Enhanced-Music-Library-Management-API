module.exports = function makeGetAlbumController({ formatResponse, getAlbumById }) {
  return async function getAlbumController(req, res) {
    try {
      // Extract album_id from the URL parameter
      const { id } = req.params;
      const authHeader = req.headers.authorization;

      // Get the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to get the album
      const result = await getAlbumById({ album_id: id, token });

      // Return the response using the status and message from the use case
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
        data: result.data || null,
      }));
    } catch (err) {
      console.error('Error in getAlbumController:', err);

      // Handle errors and return appropriate status and message
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
