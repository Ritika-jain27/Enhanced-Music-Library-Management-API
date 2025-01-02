module.exports = function makeGetTracks({ tracksDB, jwt, secretKey }) {
  return async function getTracks({ token, limit, offset, artist_id, album_id, hidden }) {
    try {
      // Verify the token and decode user data if provided
      if (token) {
        const decoded = jwt.verify(token, secretKey);
        console.info('Decoded role:', decoded.role);
      }

      // Fetch tracks from the database with optional filters
      const tracks = await tracksDB.getTracks({ limit, offset, artist_id, album_id, hidden });

      // If no tracks are found, return a 404 response
      if (!tracks || tracks.length === 0) {
        return {
          status: 404,
          message: 'No tracks found.',
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
      return {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      };
    }
  };
};
