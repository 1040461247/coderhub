const momentService = require('../service/moment.service')
const ResponseBody = require('../app/response-body')

class MomentController {
  async create(ctx) {
    const { content } = ctx.request.body
    const { id } = ctx.user
    const createRes = await momentService.create(content, id)
    ctx.body = new ResponseBody(1, 'Success', createRes)
  }

  async list(ctx) {
    const { offset, limit } = ctx.query
    const listRes = await momentService.queryList(offset, limit)
    ctx.body = new ResponseBody(1, 'Success', listRes)
  }

  async detail(ctx) {
    const { momentId } = ctx.params
    const detail = await momentService.queryById(momentId)
    ctx.body = new ResponseBody(1, 'Success', detail)
  }

  async update(ctx) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const updateRes = await momentService.update(content, momentId)
    ctx.body = new ResponseBody(1, 'Success', updateRes)
  }

  async remove(ctx) {
    const { momentId } = ctx.params
    const removeRes = await momentService.removeById(momentId)
    ctx.body = new ResponseBody(1, 'Success', removeRes)
  }

  async addLabels(ctx) {
    const labels = ctx.labels
    const { momentId } = ctx.params

    for (const label of labels) {
      const { name, id } = label
      const hasLabel = await momentService.hasLabel(momentId, id)
      if (!hasLabel) {
        await momentService.addLabel(momentId, id)
      }
    }

    ctx.body = new ResponseBody(1, 'Success')
  }
}

module.exports = new MomentController()