/**
 * 发送qq邮箱验证码
 */
const Router = require('koa-Router')
const emailRouter = new Router();

const SendemailController = require('../controller/verifycationCode.js/index')


emailRouter.post('/api/email',SendemailController.main)

module.exports = emailRouter