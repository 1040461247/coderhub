const commentService = require('../service/comment.service')
const ResponseBody = require('../app/response-body')

class CommentController {
  async create(ctx) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const createRes = await commentService.create(content, momentId, id)
    ctx.body = new ResponseBody(1, 'Success', createRes)
  }

  async reply(ctx) {
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user
    const replyRes = await commentService.reply(content, momentId, id, commentId)
    ctx.body = new ResponseBody(1, 'Success', replyRes)
  }
}

module.exports = new CommentController()
