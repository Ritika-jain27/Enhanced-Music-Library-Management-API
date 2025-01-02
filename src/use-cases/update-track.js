module.exports = function makeUpdateTrack({ tracksDB, jwt, secretKey }) {
    return async function updateTrack({ token, track_id, updatedData }) {
      try {
        // Verify the token and decode the user data
        const decoded = jwt.verify(token, secretKey);
        console.info('decoded ' + decoded.role);
  
        if (decoded.role == 'viewer') {
            throw { status: 403, message: 'Forbidden Access' };
        }

        const result = await tracksDB.updateTrackById(track_id, updatedData);
        console.info("result ", result.affectedRows);
  
        if (result.affectedRows===0) {
          throw { status: 404, message: 'Track not found' };
        }
  
        return {
          message: 'Track updated successfully.',
          data: null,
        };
      } catch (error) {  
        throw new Error(error.status ? error.message : 'Internal Server Error');
      }
    };
  };
  