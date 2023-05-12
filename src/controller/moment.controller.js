const fs = require('fs')
const momentService = require('../service/moment.service')
const { PICTURE_PATH } = require('../constant/file-path')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const res = await momentService.create(userId, content)
    ctx.body = res
  }

  async getMomentById(ctx, next) {
    const momentId = ctx.params.momentId
    const res = await momentService.getMomentById(momentId)
    ctx.body = res
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const res = await momentService.getMomentList(offset, size)
    ctx.body = res
  }

  async updateMomentById(ctx, next) {
    const momentId = ctx.params.momentId
    const { content } = ctx.request.body

    const res = await momentService.updateMomentById(momentId, content)
    ctx.body = res
  }

  async deleteMomentById(ctx, next) {
    const momentId = ctx.params.momentId
    const res = await momentService.deleteMomentById(momentId)
    ctx.body = res
  }

  async addLabels(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params

    for (let label of labels) {
      // 文章没有该标签时才添加 
      const hasLabel = await momentService.hasLabel(momentId, label.id)

      if (!hasLabel) {
        await momentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = '标签添加成功~'
  }

  async fileInfo(ctx) {
    let { filename } = ctx.params
    const fileInfo = await momentService.getFileByFilename(filename)
    
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }
    
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()
