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

postData.addPost = (userID, post, callback) => {
  const sql = 'INSERT INTO posts (author_id, post_date, text_content) VALUES ($1, current_timestamp, $2)';
  const inserts = [userID, post];
  dbConnection.query(sql, inserts, (error) => {
    if (error) callback(error);
    callback(null, 'postData success');
  });
};

module.exports = postData;
