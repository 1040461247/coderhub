const mysql = require('mysql2')
const config = require('./config')

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  // host: 'localhost',
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
})

module.exports = connections.promise()
