const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Tian000623',
  database: 'coderhub',
  connectionLimit: 5
})

const connection = connectionPool.promise()

module.exports = connection
