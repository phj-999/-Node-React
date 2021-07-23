const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')//跨域
const Session = require('koa-session');

//const MongoConnect = require('./config/mongo')//数据库
const { access } = require('./utils/log')//日志
const useRoutes = require('./routers/index')

// error handler
onerror(app)

// middlewares
app.keys = ['some secret hurr']
const session = Session({
  key: 'koa:sess',
  maxAge: 5*60*1000,
  //httpOnly: true, 
  signed: true   //签名是为了防止客户端伪造，默认值true  可设置为true
},app)
app.use(session)

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
app.use(cors());

// routes
useRoutes(app)

 //error-handling
 app.on('error', (err, ctx) => {
   console.error('server error', err, ctx,)
 });




module.exports = app
