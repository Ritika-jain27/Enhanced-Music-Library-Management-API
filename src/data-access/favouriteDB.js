module.exports = function favorites({ mysql, table }) {
    return {
        addFavorite,
        getFavoriteById,
        removeFavorite,
        getFavoritesByCategory,
    }

    async function addFavorite({ favorite_id, user_id, category, item_id, name }) {
      const query = `
        INSERT INTO ${table} (favorite_id, user_id, category, item_id, name, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    
      const values = [
        favorite_id,
        user_id,
        category,
        item_id,
        name,
        new Date(), // Use the current timestamp for created_at
      ];
    
      return mysql.execute(query, values);
    }

    async function getFavoriteById({ favorite_id, user_id }) {
      const query = `
        SELECT * 
        FROM ${table} 
        WHERE favorite_id = ? AND user_id = ?
      `;
    
      const [rows] = await mysql.execute(query, [favorite_id, user_id]);
      return rows.length > 0 ? rows[0] : null;
    }
    async function removeFavorite({ favorite_id }) {
      const query = `
        DELETE FROM ${table} 
        WHERE favorite_id = ?
      `;
    
      await mysql.execute(query, [favorite_id]);
    }

    async function getFavoritesByCategory({ category, limit, offset }) {
      // SQL query to fetch favorites based on category, without user_id filter
      const query = `
        SELECT f.favorite_id, f.category, f.item_id, f.name, f.created_at
        FROM Favorites f
        WHERE f.category = ?
        LIMIT ? OFFSET ?;
      `;
    
      // Execute the query and return results
      const [rows] = await mysql.query(query, [category, limit, offset]);
      return rows.length > 0 ? rows[0] : [];
    }
}