const multer = require('@koa/multer')
const { AVATAR_DEST } = require('../config/path')
const userService = require('../service/user.service')
const { SERVER_HOST, SERVER_PORT } = require('../config/server')

const avatarMulter = multer({
  dest: AVATAR_DEST
})
const avatarHandler = avatarMulter.single('avatar')

async function updateUserAvatar(ctx, next) {
  const { id } = ctx.user
  const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
  const res = await userService.updateAvatar(avatarUrl, id)
  console.log(res)
  await next()
}

module.exports = {
  avatarHandler,
  updateUserAvatar
}
