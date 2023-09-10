const fs = require('fs')
const userService = require('../service/user.service')
const ResponesBody = require('../app/response-body')
const fileService = require('../service/file.service')
const { AVATAR_DEST } = require('../config/path')

class UserController {
  async create(ctx) {
    const { name, password } = ctx.request.body
    const res = await userService.create(name, password)
    ctx.body = new ResponesBody(1, '用户创建成功', res)
  }

  async showAvatar(ctx) {
    const { userId } = ctx.params
    const { filename, mimetype } = await fileService.getAvatarByUserId(userId)
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${AVATAR_DEST}/${filename}`)
  }
}

module.exports = new UserController()
