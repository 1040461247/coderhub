const jwt = require('jsonwebtoken')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_IS_NOT_EXISTS,
  PASSWORD_INCORRECT,
  UNAUTHORIZED,
  OPERATION_WITHOUT_PERMISSTION
} = require('../config/error-type')
const userService = require('../service/user.service')
const permissionService = require('../service/permission.service')
const md5Encrypt = require('../utils/md5-encrypt')
const { PUBLIC_KEY } = require('../config/secret-key')

async function verifyLogin(ctx, next) {
  const { name, password } = ctx.request.body

  // 验证用户名密码是否为空
  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  // 验证用户是否存在
  const [user] = await userService.findUserByName(name)
  if (!user) {
    ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
    return
  }

  // 验证密码是否正确
  const encryptedPwd = md5Encrypt(password)
  if (encryptedPwd !== user.password) {
    ctx.app.emit('error', PASSWORD_INCORRECT, ctx)
    return
  }

  ctx.user = user
  next()
}

async function verifyAuth(ctx, next) {
  const authorization = ctx.headers.authorization
  const token = authorization?.replace('Bearer ', '')

  try {
    const user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = user
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZED, ctx)
  }
}

async function verifyPermission(ctx, next) {
  const { id } = ctx.user
  const resourceKey = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[resourceKey]
  const resourceName = resourceKey.replace('Id', '')

  const hasPermission = await permissionService.checkHasPermission(id, resourceId, resourceName)
  if (!hasPermission) {
    ctx.app.emit('error', OPERATION_WITHOUT_PERMISSTION, ctx)
    return
  }

  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
