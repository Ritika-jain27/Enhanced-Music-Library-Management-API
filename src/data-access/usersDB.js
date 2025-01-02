module.exports = function users({ mysql, table }) {
    return {
        checkUserEmailExistInDB,
        getUsersCount,
        createUser,
        getUserByEmail,
        getUsers,
        getUserById,
        deleteUser,
        getUserPasswordById,
        updatePassword,
    };

    async function checkUserEmailExistInDB({ email }) {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const query = `SELECT COUNT(*) as count FROM ${table} WHERE email = ?`;
            const [rows] = await mysql.execute(query, [email]);
            return rows[0].count > 0;

        } catch (error) {
            console.error('Error checking email existence:', error);
            throw error;
        }
    }

    async function getUsersCount() {
        try {
            const query = `SELECT COUNT(*) as count FROM ${table}`;
            const [rows] = await mysql.execute(query);
            return rows[0].count;
        } catch (error) {
            console.error('Error getting users count:', error);
            throw error;
        }
    }

    async function createUser({ user_id, email, password, role, created_at, updated_at }) {
        try {
            const query = `
                INSERT INTO ${table} 
                (user_id, email, password, role, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const [result] = await mysql.execute(query, [
                user_id,
                email,
                password,
                role,
                created_at,
                updated_at
            ]);

            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async function getUserByEmail({ email }) {
        try {
            const query = `SELECT * FROM ${table} WHERE email = ?`;
            const [rows] = await mysql.execute(query, [email]);
            return rows[0]; 
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }

    async function getUsers({ limit = 5, offset = 0, role }) {
        try {
          let query = `SELECT * FROM ${table}`; 
          console.info("role "+role);
      
          if (role) {
            query += ` WHERE role = ?`;
          }
      
          query += ` LIMIT ? OFFSET ?`; 
      
          const params = role ? [role.toLowerCase(), parseInt(limit), parseInt(offset)] : [parseInt(limit), parseInt(offset)];
          console.info("query : "+query);
      
          const [rows] = await mysql.query(query, params);
          return rows; 
        } catch (error) {
          console.error('Error fetching users from DB:', error);
          throw new Error('Error fetching users');
        }
      }

      async function getUserById({ user_id }) {
        try {
          const query = `SELECT * FROM ${table} WHERE user_id = ?`;
          const [rows] = await mysql.execute(query, [user_id]);
          return rows[0]; 
        } catch (error) {
          console.error('Error fetching user by ID:', error);
          throw error;
        }
      }
    
      async function deleteUser({ user_id }) {
        try {
          const query = `DELETE FROM ${table} WHERE user_id = ?`;
          const [result] = await mysql.execute(query, [user_id]);
          return result; 
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
        }
      }

      async function getUserPasswordById({ user_id }) {
        try {
          const query = `SELECT password FROM ${table} WHERE user_id = ?`;
          const [rows] = await mysql.execute(query, [user_id]);
          if (rows.length === 0) return null; // No user found, return null
          return rows[0].password; // Return only the password
        } catch (error) {
          console.error('Error fetching user password:', error);
          throw error;
        }
      }

      async function updatePassword({ user_id, new_password }) {
        try {
          const query = `UPDATE ${table} 
                         SET password = ?, updated_at = NOW() 
                         WHERE user_id = ?`;
          await mysql.execute(query, [new_password, user_id]);
        } catch (error) {
          console.error('Error updating password:', error);
          throw error;
        }
      }};
