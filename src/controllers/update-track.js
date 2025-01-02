module.exports = function makeUpdateTrackController({ formatResponse, updateTrack }) {
    return async function updateTrackController(req, res) {
      try {
        const { track_id } = req.params;
        const updatedData = req.body;
        const authHeader = req.headers.authorization;
  
        // Get the token from the Authorization header
        const token = authHeader.split(' ')[1];
  
        // Call the use case to update the track
        const result = await updateTrack({ track_id, token, updatedData });
  
        // Return success response
        return res.status(204).json(formatResponse({
          status: 204,
          message: result.message,
        }));
      } catch (err) {
        console.error('Error in updateTrackController:', err);
  
        // Handle specific error cases
          
        if (err.message === 'Track not found') {
          return res.status(404).json(formatResponse({
            status: 404,
            message: 'Resource Doesn’t Exist',
          }));
        }
  
        return res.status(500).json(formatResponse({
          status: 500,
          message: 'Internal Server Error',
        }));
      }
    };
  };
  