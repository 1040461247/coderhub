const userService = require('../service/user.service')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS
} = require('../config/error-type')
const md5Encrypt = require('../utils/md5-encrypt')

async function verifyUserRegister(ctx, next) {
  const { name, password } = ctx.request.body

  // 验证数据完整性
  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  // 验证数据合法性
  const userList = await userService.findUserByName(name)
  if (userList.length) {
    ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
    return
  }

  await next()
}

async function encryptPwd(ctx, next) {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Encrypt(password)
  await next()
}

module.exports = {
  verifyUserRegister,
  encryptPwd
}
