const mysql2 = require('mysql2/promise');
// Database connection configuration
const config = require('../config');
const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  
  // Create a connection pool
  const mysql = mysql2.createPool(dbConfig);

  const users = require('./usersDB');
  const usersDB = users({mysql , table:"Users"});

  const artists = require('./artistsDB');
  const artistsDB = artists({mysql , table:'Artists'});

  const albums  = require('./albumDB');
  const albumsDB = albums({mysql, table:"Albums"});

  const tracks = require('./trackDB');
  const tracksDB = tracks({mysql, table :"Tracks"});

  const favorites = require('./favouriteDB');
  const favouritesDB = favorites({mysql, table:"Favorites"});

  module.exports = {
    usersDB,
    artistsDB,
    albumsDB,
    tracksDB,
    favouritesDB,
  }
