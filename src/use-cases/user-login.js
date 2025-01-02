module.exports = function makeUserLogin({ usersDB, bcrypt, jwt, secretKey }) {
    return async function loginUser({ body }) {
      try {
        const { email, password } = body;
  
        // Fetch user from database
        const user = await usersDB.getUserByEmail({ email });
        if (!user) {
          throw new Error('User not found');
        }
  
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
  
        // Generate JWT token
        const token = jwt.sign(
          { user_id: user.user_id, email: user.email, role: user.role },
          secretKey,
          { expiresIn: '5h' }
        );
  
        // Return token only for simplicity
        return { token };
  
      } catch (error) {
        console.error('Error in loginUser:', error);
        throw error; // Let the controller handle error responses
      }
    };
  };
  