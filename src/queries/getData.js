const dbConnection = require('../database/db_connection');

const getData = {};

getData.fetch = (table, fetchColumns, lookupColumn, searchTerm, callback) => {
  const sql = `SELECT ${fetchColumns} FROM ${table} WHERE ${lookupColumn} = $1`;
  const inserts = [searchTerm];
  dbConnection.query(sql, inserts, (error, response) => {
    if (error) callback(error);
    if (response === undefined) {
      callback(null, undefined);
    } else {
      callback(null, response.rows);
    }
  });
};

getData.search = (table, fetchColumns, lookupColumn, searchTerm, callback) => {
  const sql = `SELECT ${fetchColumns} FROM ${table} WHERE ${lookupColumn} LIKE $1`;
  const inserts = [`%${searchTerm}%`];
  dbConnection.query(sql, inserts, (error, response) => {
    if (error) callback(error);
    if (response === undefined) {
      callback(null, undefined);
    } else {
      callback(null, response.rows);
    }
  });
};

getData.searchAll = (table, fetchColumns, lookupColumns, searchTerm, callback) => {
  const sql = `SELECT ${fetchColumns} FROM ${table} WHERE (${lookupColumns[0]} LIKE $1 OR ${lookupColumns[1]} LIKE $1)`;
  const inserts = [`%${searchTerm}%`];
  dbConnection.query(sql, inserts, (error, response) => {
    if (error) callback(error);
    if (response === undefined) {
      callback(null, undefined);
    } else {
      console.log(response.rows);
      callback(null, response.rows);
    }
  });
};

getData.postHistory = (callback) => {
  const sql = 'SELECT posts.id, users.username, posts.post_date, posts.text_content, (SELECT COUNT(*) FROM replies WHERE replies.post_id = posts.id GROUP BY replies.post_id) as replies FROM users INNER JOIN posts ON users.id = posts.author_id ORDER BY posts.post_date DESC';
  dbConnection.query(sql, (error, response) => {
    if (error) callback(error);
    if (response === undefined) {
      callback(null, undefined);
    } else {
      callback(null, response.rows);
    }
  });
};

getData.authorId = (user, callback) => {
  const sql = 'SELECT id from users WHERE username = $1';
  const inserts = [user];
  dbConnection.query(sql, inserts, (error, response) => {
    if (error) {
      callback(error);
    }
    callback(null, response.rows[0].id);
  });
};

module.exports = getData;
