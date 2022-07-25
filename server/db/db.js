const mysql = require('mysql2/promise');

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connectionPool = mysql.createPool(options);
function getConnection() {
  return connectionPool.getConnection();
}

module.exports = {
  getConnection,
};
