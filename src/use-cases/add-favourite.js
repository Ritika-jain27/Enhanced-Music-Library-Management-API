module.exports = function makeAddFavorite({ artistsDB, albumsDB, tracksDB, favouritesDB, uuidv4 ,jwt, secretKey}) {
  return async function addFavorite({ category, item_id , token}) {

    // Validate input
    const validCategories = ['artist', 'album', 'track'];
    const decoded = jwt.verify(token, secretKey);
    if (!validCategories.includes(category)) {
      return {
        status: 400,
        message: 'Invalid category',
      };
    }

    if (!item_id) {
      return {
        status: 400,
        message: 'Item ID is required',
      };
    }

    try {
      // Fetch the name based on the category and item_id
      let result;
      switch (category) {
        case 'artist':
          result = await artistsDB.getArtistById({artist_id:item_id});
          break;
        case 'album':
          result = await albumsDB.getAlbumById({album_id:item_id});
          break;
        case 'track':
          result = await tracksDB.getTrackById({track_id:item_id});
          break;
      }

      if (!result) {
        return {
          status: 404,
          message: `Resource Doesn't Exist.`,
        };
      }

      // Add the favorite to the database
      await favouritesDB.addFavorite({
        favorite_id: uuidv4(),
        user_id: decoded.user_id,
        category,
        item_id,
        name:result.name,
      });

      return {
        status: 201,
        message: 'Favorite added successfully.',
      };
    } catch (error) {
      console.error('Error in addFavorite use case:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  };
};
