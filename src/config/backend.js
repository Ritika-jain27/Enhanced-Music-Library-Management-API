require('dotenv').config(); // Load environment variables from .env

module.exports = {
  host: process.env.DB_HOST || '127.0.0.1',
  mysql: {
    database: process.env.DB_DATABASE || 'music_library_management_system',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    host: process.env.DB_HOST || '127.0.0.1',
  },
  jwt_token: process.env.JWT_SECRET || ''
};
