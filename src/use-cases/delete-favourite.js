module.exports = function makeRemoveFavorite({ favouritesDB , secretKey , jwt}) {
    return async function removeFavorite({ favorite_id , token}) {
      // Ensure `decoded.user_id` is passed as part of the input to avoid errors
      const decoded = jwt.verify(token, secretKey);
  
      console.info('Decoded role:', decoded.role);


      // Validate input
      if (!favorite_id) {
        return {
          status: 400,
          message: 'Favorite ID is required',
        };
      }
  
      try {
        // Check if the favorite exists and belongs to the user
        const favorite = await favouritesDB.getFavoriteById({ favorite_id, user_id: decoded.user_id });
  
        if (!favorite) {
          return {
            status: 404,
            message: 'Favorite not found.',
          };
        }
  
        // Remove the favorite
        await favouritesDB.removeFavorite({ favorite_id });
  
        return {
          status: 200,
          message: 'Favorite removed successfully.',
        };
      } catch (error) {
        console.error('Error in removeFavorite use case:', error);
        return {
          status: 500,
          message: 'Internal Server Error',
        };
      }
    };
  };
  