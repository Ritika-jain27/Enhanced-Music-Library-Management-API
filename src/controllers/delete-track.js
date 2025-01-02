module.exports = function makeDeleteTrackController({ formatResponse, deleteTrack }) {
    return async function deleteTrackController(req, res) {
      try {
        const { track_id } = req.params;
        const authHeader = req.headers.authorization;
  
        // Get the token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Call the use case to delete the track
        const result = await deleteTrack({ track_id, token });
  
        // Return success response
        return res.status(result.status).json(formatResponse({
          status: result.status,
          message: result.message,
        }));
      } catch (err) {
        console.error('Error in deleteTrackController:', err);
  
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  