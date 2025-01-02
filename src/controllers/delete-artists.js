module.exports = function makeDeleteArtistByIdController({ formatResponse, deleteArtistById }) {
    return async function deleteArtistByIdController(req, res) {
      try {
        const { id } = req.params;
        const authHeader = req.headers.authorization;
  
        // Extract token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Call the use case to delete the artist
        const result = await deleteArtistById({ token, artist_id:id });
  
        // Handle responses based on the status
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
          data: result.data || null,
        }));
      } catch (error) {
        console.error('Error in deleteArtistByIdController:', error);
  
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  