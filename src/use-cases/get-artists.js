module.exports = function makeGetArtists({ artistsDB, jwt, secretKey }) {
    return async function getArtists({ token, limit = 5, offset = 0, grammy = null, hidden = null }) {
      try {
        // Verify the token and decode the user data
  
        // Fetch artists from the database
        const artists = await artistsDB.getArtists({ limit, offset, grammy, hidden });
  
        // Transform the hidden field
        const transformedArtists = artists.map(artist => ({
          ...artist,
          hidden: artist.hidden === 1, // Convert 1 to true and 0 to false
        }));
  
        return {
          status: 200,
          artists: transformedArtists,
          message: 'Artists retrieved successfully.',
        };
      } catch (error) {
        console.error('Error in getArtists:', error);
        throw new Error(error.message || 'Internal Server Error');
      }
    };
  };
  