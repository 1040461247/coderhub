const Router = require('koa-router')
const {
  create,
  getMomentById,
  list,
  updateMomentById,
  deleteMomentById,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')
const { 
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new Router({ prefix: '/moment' })

// 添加动态
momentRouter.post('/', verifyAuth, create)

// 获取动态
momentRouter.get('/', list)
momentRouter.get('/:momentId', getMomentById)
momentRouter.get('/images/:filename', fileInfo)

// 修改/删除动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), updateMomentById)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), deleteMomentById)

// 为动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth, verifyPermission('moment'), verifyLabelExists, addLabels)


module.exports = momentRouter
