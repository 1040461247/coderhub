const Router = require('koa-router')
const { create, list } = require('../controller/label.controller')

const labelRouter = new Router({ prefix: '/label' })

labelRouter.post('/', create)
labelRouter.get('/', list)

module.exports = labelRouter
