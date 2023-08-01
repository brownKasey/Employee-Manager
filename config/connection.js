const mysql = require("mysql2");
require('dotenv').config();

let connect = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected to database: SUCCESS")
);

module.exports = connect; 