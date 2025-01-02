module.exports = function makeUpdateArtistByIdController({ formatResponse, updateArtistById }) {
    return async function updateArtistByIdController(req, res) {
      try {
        const { id } = req.params;
        const authHeader = req.headers.authorization;
        const fieldsToUpdate = req.body;
  
        // Extract token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Call the use case to update the artist
        const result = await updateArtistById({ token, artist_id:id, fieldsToUpdate });
  
        // Handle responses based on the status
        if (result.status === 204) {
          return res.status(204).send(); // No Content
        }
  
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
          data: null,
          error: null,
        }));
      } catch (error) {
        console.error('Error in updateArtistByIdController:', error);
  
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
          data: null,
          error: null,
        }));
      }
    };
  };
  