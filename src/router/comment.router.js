const KoaRouter = require('@koa/router')
const commentController = require('../controller/comment.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, commentController.create)
commentRouter.post('/reply', verifyAuth, commentController.reply)

module.exports = commentRouter
