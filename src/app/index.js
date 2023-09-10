const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const registerRouters = require('../router')

const app = new Koa()

app.use(bodyparser())

registerRouters(app)

module.exports = app
