const fs = require('fs')
const path = require('path')

const privateKeyPath = path.resolve(__dirname, './keys/private.key')
const publicKeyPath = path.resolve(__dirname, './keys/public.key')

const PRIVATE_KEY = fs.readFileSync(privateKeyPath)
const PUBLIC_KEY = fs.readFileSync(publicKeyPath)

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}
