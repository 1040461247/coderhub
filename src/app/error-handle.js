const errorTypes = require('../constant/error-types')

/**
 * 400：bad request
 * 409: conflict
 */
const errorHandle = (err, ctx) => {
  let status, message
  
  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或密码不能为空'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409
      message = '用户名已存在'
      break
    case errorTypes.USER_DOSE_NOT_EXISTS:
      status = 400
      message = '用户名不存在'
      break
    case errorTypes.PASSWORD_ERROR:
      status = 400
      message = '密码错误'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = '未授权，请先登录！'
      break
    case errorTypes.NO_PERMISSION:
      status = 401
      message = '当前用户没有操作权限'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }

    ctx.status = status
    ctx.body = message
}

module.exports = errorHandle
