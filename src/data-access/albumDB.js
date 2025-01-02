module.exports = function albums({ mysql, table }) {
    return {
        addAlbum,
        getAlbums,
        getAlbumById,
        updateAlbum,
        deleteAlbum,
    }

    async function addAlbum({ album_id, artist_id, name, year, hidden }) {
        try {
          const query = `
            INSERT INTO Albums (album_id, artist_id, name, year, hidden, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())
          `;
          const [result] = await mysql.query(query, [
            album_id,
            artist_id,
            name,
            year,
            hidden,
          ]);
      
          return result.affectedRows; // Number of rows affected
        } catch (error) {
          console.error('Error in addAlbum:', error);
          throw error;
        }
      }

      async function getAlbums({ limit = 5, offset = 0, artist_id, hidden }) {
        try {
          let query = `SELECT album_id, artist_id, name, year, hidden FROM ${table}`;
          const params = [];
      
          // Apply filtering based on artist_id
          if (artist_id) {
            query += ` WHERE artist_id = ?`;
            params.push(artist_id);
          }
      
          // Apply filtering based on hidden status
          if (hidden !== null) {
            // If the artist_id filter is already applied, use AND; otherwise, use WHERE
            if (params.length > 0) {
              query += ` AND hidden = ?`;
            } else {
              query += ` WHERE hidden = ?`;
            }
            params.push(hidden ? 1 : 0);
          }
      
          // Apply pagination
          query += ` LIMIT ? OFFSET ?`;
          params.push(limit, offset);
      
          const [rows] = await mysql.query(query, params);
          return rows;
        } catch (error) {
          console.error('Error fetching albums from DB:', error);
          throw new Error('Error fetching albums');
        }
      }

      async function getAlbumById({ album_id }) {
        try {
          const query = `SELECT album_id, artist_id, name, year, hidden FROM ${table} WHERE album_id = ?`;
          const [rows] = await mysql.execute(query, [album_id]);
          return rows[0] || null; // Return null if no album found
        } catch (error) {
          console.error('Error in getAlbumById DB call:', error);
          throw error;
        }
      }

      async function updateAlbum({ album_id, updatedData }) {
        try {
          let query = `UPDATE ${table} SET `;
          const values = [];
      
          // Dynamically build the SET part of the query based on provided fields
          if (updatedData.name) {
            query += `name = ?, `;
            values.push(updatedData.name);
          }
          if (updatedData.year) {
            query += `year = ?, `;
            values.push(updatedData.year);
          }
          if (updatedData.hidden !== undefined) {
            query += `hidden = ?, `;
            values.push(updatedData.hidden);
          }
      
          // Remove the trailing comma and space from the query
          query = query.slice(0, -2);
      
          // Add the condition for the album_id and the update timestamp
          query += `, updated_at = NOW() WHERE album_id = ?`;
          values.push(album_id);
      
          const [result] = await mysql.query(query, values);
      
          if (result.affectedRows === 0) {
            throw new Error('Album not found for update');
          }
      
          return result;
        } catch (error) {
          console.error('Error in updateAlbum DB call:', error);
          throw error;
        }
      }

      async function deleteAlbum({ album_id }) {
        try {
          const query = `DELETE FROM ${table} WHERE album_id = ?`;
          const [result] = await mysql.execute(query, [album_id]);
      
          if (result.affectedRows === 0) {
            throw new Error('Album not found for deletion');
          }
      
          return result;
        } catch (error) {
          console.error('Error in deleteAlbum DB call:', error);
          throw error;
        }
      }
      
      
}