const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const errorHandle = require('./error-handle')
const useRoutes = require('../router')

const app = new Koa()

app.useRoutes = useRoutes
app.use( bodyparser() )
app.useRoutes()

app.on('error', errorHandle)

module.exports = app
