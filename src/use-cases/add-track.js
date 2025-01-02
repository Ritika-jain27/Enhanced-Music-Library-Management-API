module.exports = function makeAddTrack({ tracksDB, artistsDB, albumsDB, jwt, secretKey, uuidv4 }) {
  return async function addTrack({ token, artist_id, album_id, name, duration, hidden }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);

      // Check for forbidden access based on role
      if (decoded.role === "viewer") {
        return { status: 403, message: 'Forbidden Access' };
      }

      // Check if the artist exists
      const artist = await artistsDB.getArtistById({ artist_id });
      if (!artist) {
        return { status: 404, message: `Artist doesn't exist.` };
      }

      // Check if the album exists
      const album = await albumsDB.getAlbumById({ album_id });
      if (!album) {
        return { status: 404, message: `Album doesn't exist.` };
      }

      // Add the new track to the database
      await tracksDB.addTrack({ track_id: uuidv4(), artist_id, album_id, name, duration, hidden });

      return { status: 201, message: 'Track added successfully.' };
    } catch (error) {
      console.error('Error in addTrack use case:', error);

      // Handle unexpected errors
      return { status: 500, message: 'Internal Server Error' };
    }
  };
};
