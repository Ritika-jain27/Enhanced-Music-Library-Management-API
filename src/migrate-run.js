'use strict';
const fs = require('fs');
// Getting environment
let ENVIRONMENT = process.env.NODE_ENV;
if (ENVIRONMENT === '' || ENVIRONMENT === undefined) {
  ENVIRONMENT = 'development';
}
// Loading configuration
const CONFIG = require('./config');
const { Sequelize, fn } = require('sequelize');
const ROOT_PATH = __dirname;// jshint ignore:line

let migrationPath = ROOT_PATH + '/migrations';
let database = CONFIG.mysql.database;

if (process.env.Database && process.env.Database === 'default_values') {
  migrationPath = ROOT_PATH + '/migrations';
  database = CONFIG.mysql.database;
}

doPostgreMigration();

async function doPostgreMigration() {
  try {
    const dialectOptions = {
      multipleStatements: true,
      decimalNumbers: true,
    };
    const sequelize = new Sequelize(database, CONFIG.mysql.username, CONFIG.mysql.password, {
      dialect: 'mysql',
      port: CONFIG.mysql.port,
      host: CONFIG.mysql.host,
      pool: {
        max: 10,
        min: 0,
        idle: 1000,
      },
      dialectOptions: dialectOptions,
      omitNull: false,
      logging: console.log, // logger.info
    });

    await sequelize.authenticate();
    const { Umzug, SequelizeStorage } = require('umzug');

    const umzug = new Umzug({
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
      migrations: {
        // params: [sequelize.getQueryInterface(), sequelize.constructor, function() {
        //   throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug"' +
        //       ' and return a promise instead.');
        // }],
        // path: migrationPath,
        // pattern: /\.js$/,
        resolve: ({ name, path, context }) => {
          const migration = require(path);
          return {
            name,
            up: async () => migration.up(context, Sequelize, fn),
            down: async () => migration.down(context, Sequelize),
          };
        },
        glob: migrationPath + '/*.js', // /\.js$/,
      },
    });

    await umzug.up();
    console.info('Postgre Migrations Completed.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
