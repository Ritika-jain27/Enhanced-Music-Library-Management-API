module.exports = function makeDeleteAlbumController({ formatResponse, deleteAlbum }) {
  return async function deleteAlbumController(req, res) {
    try {
      const { id } = req.params;
      const authHeader = req.headers.authorization;

      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to delete the album
      const result = await deleteAlbum({ album_id: id, token });

      // Send the response from the use case
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
      }));
    } catch (err) {
      console.error('Error in deleteAlbumController:', err);

      // Handle errors and return appropriate status and message
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
