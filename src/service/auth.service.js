const connection = require('../app/database')

class AuthService {
  async checkResource(tableName, momentId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`

    const [res] = await connection.execute(statement, [momentId, userId])

    if (res.length === 0) return false
    return true
  }
}

module.exports = new AuthService()
