const jwt = require('jsonwebtoken');
const makeAuthMiddleware = require('./authMiddleware');
const config = require('../config');
const {formatResponse} = require('../utilities/format-response'); // Assuming you have a formatResponse utility

const authMiddleware = makeAuthMiddleware({
  jwt,
  secretKey: config.jwt_token, // Use the secret key from .env
  formatResponse,
});

module.exports = {
  authMiddleware,
};