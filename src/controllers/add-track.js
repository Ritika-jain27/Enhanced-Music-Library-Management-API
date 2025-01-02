module.exports = function makeAddTrackController({ formatResponse, addTrack }) {
  return async function addTrackController(req, res) {
    try {
      const { artist_id, album_id, name, duration, hidden } = req.body;
      const authHeader = req.headers.authorization;

      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to add the track
      const result = await addTrack({ artist_id, album_id, name, duration, hidden, token });

      // Return the response from the use case
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
      }));
    } catch (err) {
      console.error('Error in addTrackController:', err);

      // Handle unexpected errors
      return res.status(500).json(formatResponse({
        status: 500,
        message: 'Internal Server Error',
      }));
    }
  };
};
