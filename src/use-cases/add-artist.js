module.exports = function makeAddArtist({ artistsDB, uuidv4, jwt , secretKey}) {
  return async function addArtist({ name, grammy, hidden, token }) {
    try {
      // Input validation
      const decoded = jwt.verify(token, secretKey);
  
      // Check if the user is an Admin
      if (decoded.role.toLowerCase() == 'viewer') {
        return { status: 401, message: 'Unauthorized Access' };
      }

      if (!name || typeof grammy !== 'number' || typeof hidden !== 'boolean') {
        return {
          status: 400,
          message: 'Invalid input data.',
        };
      }

      // Generate unique ID for the artist
      const artist_id = uuidv4();

      // Save to the database
      await artistsDB.addArtist({ artist_id, name, grammy, hidden });

      return {
        status: 201,
        message: 'Artist created successfully.',
      };
    } catch (error) {
      console.error('Error in addArtist use case:', error);
      return {
        status: 500,
        message: 'Internal Server Error.',
      };
    }
  };
};
