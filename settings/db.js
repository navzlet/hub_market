const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: '127.0.0.1',
  database: 'hub_market',
  user: 'root',
  password: 'root'
}); 

module.exports = connection