const KoaRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const { avatarHandler, updateUserAvatar } = require('../middleware/file.middleware')

const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, avatarHandler, updateUserAvatar, fileController.create)

module.exports = fileRouter
