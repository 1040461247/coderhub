const labelService = require('../service/label.service')
const ResponseBody = require('../app/response-body')

class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body
    const createRes = await labelService.create(name)
    ctx.body = new ResponseBody(1, 'Success', createRes)
  }

  async list(ctx) {
    const { offset, limit } = ctx.query
    const queryRes = await labelService.queryList(offset, limit)
    ctx.body = new ResponseBody(1, 'Success', queryRes)
  }
}

module.exports = new LabelController()
