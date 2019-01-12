const dbConnection = require('../database/db_connection');

const getData = {};

getData.fetch = (table, fetchColumn, lookupColumn, searchTerm, callback) => {
  const sql = `SELECT ${fetchColumn} FROM ${table} WHERE ${lookupColumn} = $1`;
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

module.exports = getData;
