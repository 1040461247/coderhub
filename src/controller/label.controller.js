const labelService = require('../service/label.service')

class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body
    const res = await labelService.create(name)
    ctx.body = res
  }

  async list(ctx) {
    const { offset, limit } = ctx.query
    const res = await labelService.getLabelList(offset, limit)
    ctx.body = res
  }
}

module.exports = new LabelController()
