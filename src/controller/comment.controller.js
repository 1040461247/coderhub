const { createComment, createReply, update, remove, getCommentByMomentId } = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const usreId = ctx.user.id

    const res = await createComment(momentId, usreId, content)

    ctx.body = res
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const usreId = ctx.user.id
    const { commentId } = ctx.params

    const res = await createReply(momentId, usreId, content, commentId)

    ctx.body = res
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const { commentId } = ctx.params

    const res = await update(commentId, content)
    ctx.body = res
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params
    const res = await remove(commentId)
    ctx.body = res
  }

  async getCommentByMomentId(ctx, next) {
    const { momentId } = ctx.query
    const res = await getCommentByMomentId(momentId)
    ctx.body = res
  }
}

module.exports = new CommentController()
