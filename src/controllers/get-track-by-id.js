module.exports = function makeGetTrackController({ formatResponse, getTrack }) {
  return async function getTrackController(req, res) {
    try {
      // Extract track_id from request parameters
      const { track_id } = req.params;
      const authHeader = req.headers.authorization;

      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Call the use case to retrieve the track
      const result = await getTrack({ track_id, token });

      // Return the successful response
      return res.status(result.status).json(formatResponse({
        status: result.status,
        message: result.message,
        data: result.data || null,
      }));
    } catch (err) {
      console.error('Error in getTrackController:', err);

      // Handle errors and return appropriate HTTP status and message
      return res.status(err.status || 500).json(formatResponse({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      }));
    }
  };
};
