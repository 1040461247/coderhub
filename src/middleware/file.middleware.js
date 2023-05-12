const path = require('path')
const multer = require('koa-multer')
const jimp = (require('jimp'))
const { AVATAR_PATH, PICTURE_PATH } = require('../constant/file-path')

const avatarUpload = multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = multer({
  dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  // 获取multer处理后保存的图片信息（此处使用了muter.array处理了多张图片）
  const files = ctx.req.files
  console.log(files)

  for (let file of files) {
    // 获取原图片的保存路径
    const destPath = path.join(file.destination, file.filename)
    console.log(file)

    // 读取原图
    jimp.read(file.path).then(img => {
      // 根据原图生成不同尺寸的图片，并重新写入指定路径
      img.resize(1280, jimp.AUTO).write(`${destPath}-large`)
      img.resize(640, jimp.AUTO).write(`${destPath}-middle`)
      img.resize(320, jimp.AUTO).write(`${destPath}-small`)
    })
  }

  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}
