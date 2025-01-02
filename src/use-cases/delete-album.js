module.exports = function makeDeleteAlbum({ albumsDB, jwt, secretKey }) {
  return async function deleteAlbum({ token, album_id }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);

      // Check if the user has sufficient privileges
      if (decoded.role === 'viewer') {
        return { status: 403, message: 'Forbidden Access.' };
      }

      // Check if the album exists
      const album = await albumsDB.getAlbumById({ album_id });
      if (!album) {
        return { status: 404, message: 'Resource Doesn\'t Exist.' };
      }

      // Call the DB to delete the album
      await albumsDB.deleteAlbum({ album_id });

      // Return success message
      return { status: 200, message: `Album: ${album.name} deleted successfully.` };
    } catch (error) {
      console.error('Error in deleteAlbum use case:', error);

      // Handle unexpected errors gracefully
      return { status: 500, message: 'Internal Server Error' };
    }
  };
};
