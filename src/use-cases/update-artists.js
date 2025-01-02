module.exports = function makeUpdateArtistById({ artistsDB, jwt, secretKey }) {
  return async function updateArtistById({ token, artist_id, fieldsToUpdate }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);

      console.info('Decoded role:', decoded.role);

      // Check if the role is allowed to update
      if (decoded.role === 'viewer') {
        return {
          status: 403,
          message: 'Forbidden Access: Viewers cannot update artists.',
        };
      }

      // Update the artist in the database
      const isUpdated = await artistsDB.updateArtistById({ artist_id, fieldsToUpdate });

      if (!isUpdated) {
        return {
          status: 404,
          message: 'Artist not found.',
        };
      }

      return {
        status: 204,
        message: 'Artist updated successfully.',
      };
    } catch (error) {
      console.error('Error in updateArtistById:', error);

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
