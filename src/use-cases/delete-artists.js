module.exports = function makeDeleteArtistById({ artistsDB, jwt, secretKey }) {
    return async function deleteArtistById({ token, artist_id }) {
      try {
        // Verify the token and decode the user data
        const decoded = jwt.verify(token, secretKey);
  
        console.info('Decoded role:', decoded.role);
  
        // Check if the role is allowed to delete
        if (decoded.role === 'viewer') {
          return {
            status: 403,
            message: 'Forbidden Access: Viewers cannot delete artists.',
          };
        }
  
        // Fetch the artist details by ID
        const artist = await artistsDB.getArtistById({artist_id});
  
        if (!artist) {
          return {
            status: 404,
            message: 'Artist not found.',
          };
        }
  
        // Delete the artist
        const affectedRows = await artistsDB.deleteArtistById(artist_id);
  
        if (affectedRows === 0) {
          return {
            status: 404,
            message: 'Artist not found.',
          };
        }
  
        return {
          status: 200,
          message: `Artist: ${artist.name} deleted successfully.`,
          data: { artist_id },
        };
      } catch (error) {
        console.error('Error in deleteArtistById:', error);
  
        if (error.message.includes('Bad Request')) {
          return {
            status: 400,
            message: error.message,
          };
        }
  
        throw new Error(error.message || 'Internal Server Error');
      }
    };
  };
  