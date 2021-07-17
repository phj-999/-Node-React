
/***
 * 用户登录的路由
 * @module authRouter
 */
const Router = require('koa-Router');
const authRouter = new Router();

const AuthController = require('../controller/users/auth.controller')
const {verifyLogin} = require('../middlewares/auth.middleware')

authRouter.post('/api/login', verifyLogin, AuthController.login)

module.exports = authRouter