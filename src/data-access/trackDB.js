module.exports = function tracks({ mysql, table }) {
    return {
        addTrack,
        getTracks,
        getTrackById,
        updateTrackById,
        deleteTrackById,
    }

    async function addTrack({track_id, artist_id, album_id, name, duration, hidden = 0 }) {
        try {
          const query = `
            INSERT INTO ${table} (track_id, artist_id, album_id, name, duration, hidden, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
          `;
          const [result] = await mysql.execute(query, [track_id, artist_id, album_id, name, duration, hidden]);
      
          return {
            track_id,
            artist_id,
            album_id,
            name,
            duration,
            hidden,
            message: 'Track created successfully.',
          };
        } catch (error) {
          console.error('Error in addTrack DB call:', error);
          throw error;
        }
      }

      async function getTracks({ limit = 5, offset = 0, artist_id, album_id, hidden }) {
        try {
          const filters = [];
          const params = [];
          
          let query = `SELECT track_id, artist_id, album_id, name, duration, hidden FROM ${table}`;
          
          if (artist_id) {
            filters.push('artist_id = ?');
            params.push(artist_id);
          }
          
          if (album_id) {
            filters.push('album_id = ?');
            params.push(album_id);
          }
          
          if (hidden !== undefined) {
            filters.push('hidden = ?');
            params.push(hidden);
          }
          
          if (filters.length > 0) {
            query += ` WHERE ${filters.join(' AND ')}`;
          }
          
          query += ` LIMIT ? OFFSET ?`;
          params.push(limit, offset);
          
          const [result] = await mysql.query(query, params);
      
          return result;
        } catch (error) {
          console.error('Error in getTracks DB call:', error);
          throw error;
        }
      }

      async function getTrackById(track_id) {
        try {
          const query = `SELECT track_id, artist_id, album_id, name, duration, hidden FROM ${table} WHERE track_id = ?`;
      
          const [result] = await mysql.execute(query, [track_id]);
      
          if (result.length === 0) {
            throw new Error('Track not found');
          }
      
          return result[0];
        } catch (error) {
          console.error('Error in getTrackById DB call:', error);
          throw error;
        }
      }
      
      async function updateTrackById(track_id, updatedData) {
        try {
          // Dynamically build the SET clause of the SQL query based on the provided fields
          const fields = Object.keys(updatedData);
          const values = Object.values(updatedData);
          const setClause = fields.map((field) => `${field} = ?`).join(', ');
      
          const query = `UPDATE ${table} SET ${setClause}, updated_at = NOW() WHERE track_id = ?`;
          values.push(track_id); // Add track_id to the parameters
      
          const [result] = await mysql.execute(query, values);
      
          return result;
        } catch (error) {
          console.error('Error in updateTrackById DB call:', error);
          throw error;
        }
      }  

      async function deleteTrackById(track_id) {
        try {
          const query = `DELETE FROM ${table} WHERE track_id = ?`;
          const [result] = await mysql.execute(query, [track_id]);
            
          return result;
        } catch (error) {
          console.error('Error in deleteTrackById DB call:', error);
          throw error;
        }
      }
}