const { AVATAR_PATH } = require('../constant/file-path')
const service = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx) {
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    await service.saveAvatarInfo(filename, mimetype, size, id)

    // 保存用户头像信息到users表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)
    
    ctx.body = '上传头像成功'
  }

  async savePictureInfo(ctx) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query

    for (let file of files) {
      const { filename, mimetype, size } = file
      await service.createFile(filename, mimetype, size, momentId, id)
    }

    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileController()
