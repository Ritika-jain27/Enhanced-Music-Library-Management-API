module.exports =  function makeUserSignUp({usersDB, bcrypt, uuidv4}){
    return async function createUserSignUp({body}) {
             console.info(body);
             try {
                // Check if email exists
                const emailExists = await usersDB.checkUserEmailExistInDB({ 
                    email: body.email 
                });
    
                if (emailExists) {
                    throw new Error('Email already exists');
                }
    
                // Check if this is the first user (admin)
                const usersCount = await usersDB.getUsersCount();
                const role = usersCount === 0 ? 'admin' : 'viewer';
    
                // Hash password
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    
                // Create user object
                const now = new Date();
                const userData = {
                    user_id: uuidv4(),
                    email: body.email,
                    password: hashedPassword,
                    role: role,
                    created_at: now,
                    updated_at: now
                };
    
                // Create user in database
                await usersDB.createUser(userData);
    
                // Return success response (excluding password)
                const { password, ...userResponse } = userData;
                return userResponse;
    
            } catch (error) {
                console.error('Error in createUserSignUp:', error);
                throw error;
             }
            }
}