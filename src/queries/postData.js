const dbConnection = require('../database/db_connection');

const postData = {};

postData.addUser = (hashUser, hashPass, callback) => {
  const sql = 'INSERT INTO authorisation (username, password) VALUES ($1, $2)';
  const inserts = [hashUser, hashPass];
  dbConnection.query(sql, inserts, (error) => {
    if (error) callback(error);
    callback(null, 'postData success');
  });
};

module.exports = postData;
