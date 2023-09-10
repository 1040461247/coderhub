const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret-key')
const ResponseBody = require('../app/response-body')

class LoginController {
  sign(ctx) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })

    ctx.body = new ResponseBody(1, 'Success', { id, name, token })
  }

  verify(ctx) {
    ctx.body = new ResponseBody(1, 'Success', { ...ctx.user })
  }
}

module.exports = new LoginController()
