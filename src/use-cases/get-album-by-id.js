module.exports = function makeGetAlbumById({ albumsDB, jwt, secretKey }) {
  return async function getAlbumById({ album_id, token }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);

      // Fetch the album from the database
      const album = await albumsDB.getAlbumById({ album_id });

      if (!album) {
        // Return 404 if the album is not found
        return {
          status: 404,
          message: 'Resource doesn\'t exist.',
        };
      }

      // Return success response with the album data
      return {
        status: 200,
        message: 'Album retrieved successfully.',
        data: album,
      };
    } catch (error) {
      console.error('Error in getAlbumById:', error);

      // Handle unexpected errors and return a consistent response
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };
};
