const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  USER_IS_NOT_EXISTS,
  PASSWORD_INCORRECT,
  UNAUTHORIZED,
  OPERATION_WITHOUT_PERMISSTION
} = require('../config/error-type')
const ResponesBody = require('../app/response-body')

app.on('error', (errType, ctx) => {
  let code = errType
  let message = '未知错误'

  switch (errType) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      message = '用户名或密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      message = '用户名已存在'
      break
    case USER_IS_NOT_EXISTS:
      message = '用户不存在'
      break
    case PASSWORD_INCORRECT:
      message = '密码错误'
      break
    case UNAUTHORIZED:
      message = '无效token'
      break
    case OPERATION_WITHOUT_PERMISSTION:
      message = '当前用户无操作权限'
      break
  }

  ctx.body = new ResponesBody(code, message)
})
