module.exports = function makeAddArtistController({ formatResponse, addArtist }) {
    return async function addArtistController(req, res) {
      try {
        const { name, grammy, hidden } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
  
        // Calling the use case
        const { status, message } = await addArtist({ name, grammy, hidden, token });
  
        // Sending response
        return res.status(status).json(formatResponse({
          status,
          message,
        }));
      } catch (err) {
        console.error('Error in addArtistController:', err);
  
        // Returning generic error response
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  