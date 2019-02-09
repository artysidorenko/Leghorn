const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

let options = {};

if (process.env.DATABASE_URL) {
  // database linked to heroku account
  options = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
} else {
  // database being run locally
  let URL_DB = process.env.DB_URL;

  if (process.env.NODE_ENV === 'test') {
    URL_DB = process.env.TEST_DB_URL;
  }

  if (!URL_DB) throw new Error('Enviromental variable DB_URL must be set.');

  const params = url.parse(URL_DB);
  const [username, password] = params.auth.split(':');
  options = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    max: process.env.DB_MAX_CONNECTIONS || 2,
    user: username,
    password,
  };
}

module.exports = new Pool(options);
