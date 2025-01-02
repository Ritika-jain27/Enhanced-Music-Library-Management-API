module.exports = function makeUserSignUp({ formatResponse, userSignUp }) {
    return async function createUserSignUp(req, res) {
        try {
            const reqBody = req.body;
            
            // Input validation
            if (!reqBody?.email || !reqBody?.password) {
                return res.status(400).json(formatResponse({
                    status: 400,
                    message: `Bad Request, Reason: ${!reqBody?.email ? 'email' : 'password'} is required`,
                    data: null,
                    error: null
                }));
            }

            // Call user signup service
            const result = await userSignUp({ body: reqBody });

            // Send success response
            return res.status(201).json(formatResponse({
                status: 201,
                message: 'User created successfully',
                data: null,
                error: null
            }));

        } catch (err) {
            console.error("Error in user signup:", err);
            
            // Handle email exists error
            if (err.message === 'Email already exists') {
                return res.status(409).json(formatResponse({
                    status: 409,
                    message: 'Email already exists',
                    data: null,
                    error: null
                }));
            }

            // Handle other errors
            return res.status(500).json(formatResponse({
                status: 500,
                message: 'Internal Server Error',
                data: null,
                error: err.message
            }));
        }
    };
};