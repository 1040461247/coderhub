const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })

    ctx.body = { id, name, token }
  }

  async success(ctx) {
    ctx.body = ctx.user
  }
}

module.exports = new AuthController()
