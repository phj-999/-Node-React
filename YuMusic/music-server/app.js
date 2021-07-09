const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const index = require('./routes/index')
const users = require('./routes/users')
const koaCors = require('./middlewares/koa-cors')
const MongoConnect = require('./config/mongo')
const { access } = require('./utils/log')

// error handler
onerror(app)

//mongoose
MongoConnect()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
//处理静态目录
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  const log = `${ctx.method} -- ${ctx.url} --${ms}ms -- ${ctx.headers['user-agent']} -- ${Date.now()}`
  access(log)
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//cors跨域
app.use(koaCors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,//允许发送Cookie
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



module.exports = app
