module.exports = function makeGetArtistById({ artistsDB, jwt, secretKey }) {
    return async function getArtistById({ token, artist_id }) {
      try {
        // const decoded = jwt.verify(token, secretKey);
        // console.info('Decoded role:', decoded.role);
  
        const artist = await artistsDB.getArtistById({ artist_id });
        console.info("artist : ", artist);
  
        if (!artist) {
          return {
            status: 404,
            message: 'Artist not found.',
          };
        }
  
        return {
          status: 200,
          message: 'Artist retrieved successfully.',
          data: {
            ...artist,
            hidden: artist.hidden === 1 ? true : false,
          },
        };
      } catch (error) {
        console.error('Error in getArtistById:', error);
        return {
          status: 500,
          message: 'Internal Server Error',
        };
      }
    };
  };