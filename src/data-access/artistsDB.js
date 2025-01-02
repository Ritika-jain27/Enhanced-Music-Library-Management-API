module.exports = function artists({ mysql, table }) {
    return {
        addArtist,
        getArtists,
        getArtistById,
        updateArtistById,
        deleteArtistById,
    }

    async function addArtist({ artist_id, name, grammy, hidden }) {
        try {
          const query = `INSERT INTO ${table} (artist_id, name, grammy, hidden, created_at, updated_at) 
                         VALUES (?, ?, ?, ?, NOW(), NOW())`;
          await mysql.execute(query, [artist_id, name, grammy, hidden]);
        } catch (error) {
          console.error('Error adding artist:', error);
          throw error;
        }
      }

      async function getArtists({ limit, offset, grammy, hidden }) {
        try {
          let query = `SELECT artist_id,name,grammy,hidden FROM ${table} WHERE 1=1`;
          const params = [];
    
          if (grammy !== null) {
            query += ` AND grammy = ?`;
            params.push(grammy);
          }
    
          if (hidden !== null) {
            query += ` AND hidden = ?`;
            params.push(hidden ? 1 : 0);
          }
    
          query += ` LIMIT ? OFFSET ?`;
          params.push(limit, offset);
    
          const [rows] = await mysql.query(query, params);
          return rows;
        } catch (error) {
          console.error('Error in getArtists:', error);
          throw error;
        }
      }

      async function getArtistById({artist_id}) {
        try {
          const query = `SELECT artist_id, name, grammy, hidden FROM ${table} WHERE artist_id = ?`;
          const [rows] = await mysql.execute(query, [artist_id]);
          return rows[0] || null; // Return null if no artist found
        } catch (error) {
          console.error('Error in getArtistById:', error);
          throw error;
        }
      }

      async function updateArtistById({ artist_id, fieldsToUpdate }) {
        try {
          const allowedFields = ['name', 'grammy', 'hidden'];
          const updates = [];
          const params = [];
      
          for (const [field, value] of Object.entries(fieldsToUpdate)) {
            if (allowedFields.includes(field)) {
              updates.push(`${field} = ?`);
              params.push(value);
            }
          }
      
          if (updates.length === 0) {
            throw new Error('Bad Request: No valid fields to update.');
          }
      
          // Add updated_at field update
          updates.push(`updated_at = NOW()`);
      
          params.push(artist_id);
          const query = `UPDATE ${table} SET ${updates.join(', ')} WHERE artist_id = ?`;
          const [result] = await mysql.query(query, params);
      
          return result.affectedRows > 0; // Return true if the artist was updated
        } catch (error) {
          console.error('Error in updateArtistById:', error);
          throw error;
        }
      }
      
      
      async function deleteArtistById(artist_id) {
        try {
          const query = `DELETE FROM ${table} WHERE artist_id = ?`;
          const [result] = await mysql.query(query, [artist_id]);
      
          return result.affectedRows; // Number of rows affected
        } catch (error) {
          console.error('Error in deleteArtistById:', error);
          throw error;
        }
      }
}