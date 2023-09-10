const connection = require('../app/database')

class UserService {
  async create(name, password) {
    const statement = 'INSERT INTO `user` (`name`, `password`) VALUES (?, ?);'
    const [res] = await connection.execute(statement, [name, password])
    return res
  }

  async findUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const [res] = await connection.execute(statement, [name])
    return res
  }

  async updateAvatar(avatarUrl, userId) {
    console.log(avatarUrl, userId)
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [avatarUrl, userId])
    return res
  }

}

module.exports = new UserService()
