const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [res] = await connection.execute(statement, [name])
    return res
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [res] = await connection.execute(statement, [name])
    return res[0]
  }

  async getLabelList(offset, limit) {
    const statement = `SELECT * FROM label LIMIT ?,?;`
    const [res] = await connection.execute(statement, [offset, limit])
    return res
  }
}

module.exports = new LabelService()
