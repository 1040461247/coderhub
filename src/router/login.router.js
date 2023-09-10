const KoaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, loginController.sign)

// 测试接口
loginRouter.get('/', verifyAuth, loginController.verify)

module.exports = loginRouter
