module.exports = function makeGetArtistByIdController({ formatResponse, getArtistById }) {
    return async function getArtistByIdController(req, res) {
      try {
        const { artist_id } = req.params;
        const authHeader = req.headers.authorization;
  
        const token = authHeader.split(' ')[1];
  
        // Call the use case to get the artist
        const result = await getArtistById({ artist_id, token });
  
        // Return the appropriate response
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
          data: result.data || null,
        }));
      } catch (err) {
        console.error('Error in getArtistByIdController:', err);
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };