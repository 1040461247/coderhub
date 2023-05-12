const Router = require('koa-router')
const {
  create,
  avatarInfo
} = require('../controller/user.controller')
const {
  verifyUser,
  encryption
} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, encryption, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
