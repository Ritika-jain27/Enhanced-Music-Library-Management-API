module.exports = function makeGetTracks({ tracksDB, jwt, secretKey }) {
  return async function getTracks({ token, limit, offset, artist_id, album_id, hidden }) {
    try {
      const tracks = await tracksDB.getTracks({ limit, offset, artist_id, album_id, hidden });

      // If no tracks are found, return a 404 response
      if (!tracks || tracks.length === 0) {
        return {
          status: 404,
          message: 'No tracks found for the given filters',
        };
      }

      // Return success response
      return {
        status: 200,
        message: 'Tracks retrieved successfully.',
        data: tracks,
      };
    } catch (error) {
      console.error('Error in getTracks use case:', error);

      // Handle specific errors and return appropriate responses
      return {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      };
    }
  };
};
