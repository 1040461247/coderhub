const KoaRouter = require('@koa/router')
const labelController = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const labelRouter = new KoaRouter({ prefix: '/label' })

labelRouter.post('/', verifyAuth, labelController.create)
labelRouter.get('/list', labelController.list)

module.exports = labelRouter
