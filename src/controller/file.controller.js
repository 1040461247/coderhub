const fileService = require('../service/file.service')
const ResponseBody = require('../app/response-body')

class FileController {
  async create(ctx) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user
    await fileService.create(filename, mimetype, size, id)
    ctx.body = new ResponseBody(1, 'Success', ctx.request.file)
  }
}

module.exports = new FileController()
