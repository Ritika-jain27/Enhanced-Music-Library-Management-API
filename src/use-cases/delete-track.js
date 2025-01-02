module.exports = function makeDeleteTrack({ tracksDB, jwt, secretKey }) {
    return async function deleteTrack({ token, track_id }) {
        try {
            // Verify the token and decode the user data
            const decoded = jwt.verify(token, secretKey);
            console.info('decoded ' + decoded.role);

            // Call the DB to delete the track
            if (decoded.role === "viewer") {
                return {
                    status: 403,
                    message: 'Forbidden Access.',
                };
            }
            const result = await tracksDB.deleteTrackById(track_id);

            if (result.affectedRows == 0) {
                return {
                    status: 404,
                    message: 'Track not found.',
                };
            }

            return {
                status: 204,
                message: `Track deleted successfully.`,
            };
        } catch (error) {
            throw new Error(error.status ? error.message : 'Internal Server Error');
        }
    };
};
