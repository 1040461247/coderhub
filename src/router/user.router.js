const Router = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUserRegister, encryptPwd } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUserRegister, encryptPwd, userController.create)
userRouter.get('/avatar/:userId', userController.showAvatar)

module.exports = userRouter
