const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`

    const res = await connection.execute(statement, [name, password])
    
    return res
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`

    const res = await connection.execute(statement, [name])
    return res
  }

  async getAvatarByUserId(id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [res] = await connection.execute(statement, [id])
    return res[0]
  }

  async updateAvatarUrlById(avatarUrl, id) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [avatarUrl, id])
    return res
  }
}

module.exports = new UserService()
