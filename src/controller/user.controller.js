const fs = require('fs')
const service = require('../service/user.service')
const { AVATAR_PATH } = require('../constant/file-path')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body

    // 查询数据
    const result = await service.create(user)

    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx) {
    const { userId } = ctx.params
    const avatarInfo = await service.getAvatarByUserId(userId)

    // 设置响应头content-type为图片，否则用户在浏览器中访问该图片资源时会被当做是一个文件下载
    ctx.response.set('content-type', avatarInfo.mimetype)
    // 通过读取图片所在位置，返回图片的二进制流
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
