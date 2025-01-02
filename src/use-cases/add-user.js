module.exports = function makeAddUser({ usersDB, jwt, secretKey, uuidv4, bcrypt }) {
  return async function addUser({ email, password, role, token }) {
    try {
      // Verify the token and decode the user data
      const decoded = jwt.verify(token, secretKey);

      // Check if the user is an Admin
      if (decoded.role.toLowerCase() !== 'admin') {
        return { status: 401, message: 'Unauthorized Access' };
      }

      // Validate the role
      const validRoles = ['editor', 'viewer'];
      if (!validRoles.includes(role.toLowerCase())) {
        return { status: 403, message: 'Forbidden Access/Operation not allowed.' };
      }

      // Prevent creating another admin user
      if (role.toLowerCase() === 'admin') {
        return { status: 403, message: 'Forbidden Access/Operation not allowed.' };
      }

      // Check if the email already exists
      const emailExists = await usersDB.checkUserEmailExistInDB({ email });
      if (emailExists) {
        return { status: 409, message: 'Email already exists.' };
      }

      // Create the new user
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await usersDB.createUser({
        user_id: uuidv4(),
        email,
        password: hashedPassword,
        role: role.toLowerCase(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      // Success response
      return { status: 201, message: 'User created successfully.' };
    } catch (error) {
      console.error('Error in addUser:', error);

      // Unexpected error handling
      return { status: 500, message: 'Internal Server Error' };
    }
  };
};
