module.exports = function makeGetFavorites({ favouritesDB }) {
    return async function getFavorites({ category, limit, offset }) {
      try {
        // Validate category
        const validCategories = ['artist', 'album', 'track'];
        if (!validCategories.includes(category)) {
          return {
            status: 400,
            message: 'Invalid category. Allowed categories are artist, album, track.',
            data: null,
            error: null,
          };
        }
  
        // Retrieve the favorites from the database by category without user_id filter
        const favorites = await favouritesDB.getFavoritesByCategory({
          category,
          limit,
          offset,
        });
  
        // If no favorites are found, return an empty array
        if (favorites.length === 0) {
          return {
            status: 200,
            message: 'No favorites found.',
            data: [],
          };
        }
  
        // Return the formatted favorites directly as we assume 'name' is included in the query result
        return {
          status: 200,
          message: 'Favorites retrieved successfully.',
          data: favorites,
        };
      } catch (error) {
        console.error('Error in getFavorites use case:', error);
  
        return {
          status: 500,
          message: 'Internal Server Error',
          data: null,
        };
      }
    };
  };
  