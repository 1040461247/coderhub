const connection = require('../app/database')

class FileService {
  async saveAvatarInfo(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);`
    const res = connection.execute(statement, [filename, mimetype, size, userId])
    return res
  }

  async createFile(filename, mimetype, size, momentId, userId) {
    const statement = `INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES (?,?,?,?,?);`
    const res = connection.execute(statement, [filename, mimetype, size, momentId, userId])
    return res
  }
}

module.exports = new FileService()
