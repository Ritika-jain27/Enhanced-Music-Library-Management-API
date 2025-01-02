module.exports = function makeGetAlbums({ albumsDB, jwt, secretKey, artistsDB }) {
  return async function getAlbums({ token, limit = 5, offset = 0, artist_id = null, hidden = null }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);
      console.info('Decoded role:', decoded.role);

      // If artist_id is provided, verify its existence
      if (artist_id) {
        const artist = await artistsDB.getArtistById({ artist_id });

        if (!artist) {
          // Return 404 if the artist is not found
          return {
            status: 404,
            message: 'Artist not found, invalid artist ID.',
          };
        }
      }

      // Fetch albums from the database
      const albums = await albumsDB.getAlbums({ limit, offset, artist_id, hidden });

      return {
        status: 200,
        message: 'Albums retrieved successfully.',
        data: albums,
      };
    } catch (error) {
      console.error('Error in getAlbums use case:', error);

      // Handle unexpected errors and return a consistent response
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };
};
