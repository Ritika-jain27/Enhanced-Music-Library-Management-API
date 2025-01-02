module.exports = function makeAddAlbumController({ formatResponse, addAlbum }) {
  return async function addAlbumController(req, res) {
    try {
      const { artist_id, name, year, hidden } = req.body;
      const authHeader = req.headers.authorization;

      // Extract token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to add the album
      const result = await addAlbum({
        token,
        artist_id,
        name,
        year,
        hidden,
      });

      // Handle responses based on the status
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
        data: result.data || null,
      }));
    } catch (error) {
      console.error('Error in addAlbumController:', error);

      return res.status(500).json(formatResponse({
        status: 500,
        message: 'Internal Server Error',
      }));
    }
  };
};
