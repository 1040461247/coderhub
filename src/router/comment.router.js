const Router = require('koa-router')
const { create, reply, update, remove, getCommentByMomentId } = require('../controller/comment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission('comment'), update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission('comment'), remove)
commentRouter.get('/', getCommentByMomentId)

module.exports = commentRouter
