const crypto = require('crypto')

function md5Encrypt(origin) {
  const md5 = crypto.createHash('md5')
  return md5.update(origin).digest('hex')
}

module.exports = md5Encrypt
