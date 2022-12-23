const mysql = require("mysql2");

const connection = mysql.createPool({
  host: '127.0.0.1',
  database: 'hub_market',
  user: 'root',
  password: 'root'
}); 
// connection.conn

module.exports = connection