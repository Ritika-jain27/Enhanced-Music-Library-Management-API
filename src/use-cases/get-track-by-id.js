module.exports = function makeGetTrack({ tracksDB, jwt, secretKey }) {
  return async function getTrack({ token, track_id }) {
    try {
      // Verify the token and decode the user information
      const decoded = jwt.verify(token, secretKey);
      console.info('Decoded role:', decoded.role);

      // Fetch the track by ID from the database
      const track = await tracksDB.getTrackById(track_id);

      // If no track is found, return a 404 error
      if (!track) {
        return {
          status: 404,
          message: 'Track not found',
        };
      }

      // Return success response
      return {
        status: 200,
        message: 'Track retrieved successfully.',
        data: track,
      };
    } catch (error) {
      console.error('Error in getTrack use case:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };
};
