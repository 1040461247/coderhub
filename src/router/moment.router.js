const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, momentController.create)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', momentController.detail)
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, momentController.addLabels)

module.exports = momentRouter
