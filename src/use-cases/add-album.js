module.exports = function makeAddAlbum({ albumsDB, jwt, secretKey, uuidv4 , artistsDB}) {
  return async function addAlbum({ token, artist_id, name, year, hidden }) {
    try {
      // ing the token and decode the user data
      const decoded = jwt.verify(token, secretKey);

      console.info('Decoded role:', decoded.role);

      if (decoded.role === 'viewer') {
        return {
          status: 403,
          message: 'Forbidden Access: Viewers cannot add albums.',
        };
      }

      // Check if the artist exists
      const artist = await artistsDB.getArtistById({artist_id});

      if (!artist) {
        return {
          status: 404,
          message: 'Resource Doesn’t Exist.',
        };
      }

      // Generating a new album ID
      const album_id = uuidv4();

      // Adding the album
      const affectedRows = await albumsDB.addAlbum({
        album_id,
        artist_id,
        name,
        year,
        hidden,
      });

      if (affectedRows === 0) {
        return {
          status: 400,
          message: 'Bad Request: Failed to create album.',
        };
      }

      return {
        status: 201,
        message: 'Album created successfully.',
        data: null,
      };
    } catch (error) {
      console.error('Error in addAlbum:', error);
      throw new Error(error.message || 'Internal Server Error');
    }
  };
};
