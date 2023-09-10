const connection = require('../app/database')

class PermissionService {
  async checkHasPermission(userId, resourceId, resourceName) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [res] = await connection.execute(statement, [resourceId, userId])
    return !!res.length
  }
}

module.exports = new PermissionService()
