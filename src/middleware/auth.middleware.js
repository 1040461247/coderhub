const jwt = require('jsonwebtoken')

const errorTypes = require('../constant/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5Encryp = require('../utils/md5-encryp')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 判断用户名密码是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  
  // 判断用户名是否存在
  const res = await userService.getUserByName(name)
  const userInfo = res[0][0]
  if (!userInfo) {
    const error = new Error(errorTypes.USER_DOSE_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码是否正确（加密）
  const encrypted = md5Encryp(password)
  if (encrypted !== userInfo.password) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = userInfo
  await next()
}

const verifyAuth = async (ctx, next) => {
  const token = ctx.header.authorization?.replace('Bearer ', '')

  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = res
    await next()
  } catch (err) {
    console.log(err)
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    const id = ctx.params[tableName + 'Id']
    const userId = ctx.user.id
    const isPermission = await authService.checkResource(tableName, id, userId)
  
    if (isPermission) {
      await next()
    } else {
      const error = new Error(errorTypes.NO_PERMISSION)
      ctx.app.emit('error', error, ctx)
    }
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
