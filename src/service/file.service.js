const connection = require('../app/database')

class FileService {
  async create(filename, mimetype, size, id) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [res] = await connection.execute(statement, [filename, mimetype, size, id])
    return res
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [res] = await connection.execute(statement, [userId])
    return res.pop()
  }
}

module.exports = new FileService()
