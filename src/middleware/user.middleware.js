const errorTypes = require('../constant/error-types')
const service = require('../service/user.service')
const md5Encryp = require('../utils/md5-encryp')

// 验证用户名和密码
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 判断用户名或密码不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是否被注册过
  const res = await service.getUserByName(name)
  if (res[0].length > 0) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

// 加密密码
const encryption = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Encryp(password)

  await next()
}

module.exports = {
  verifyUser,
  encryption
}