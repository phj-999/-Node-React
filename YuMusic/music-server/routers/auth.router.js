
/***
 * 用户登录的路由
 * @module authRouter
 */
const Router = require('koa-Router');
const authRouter = new Router();

const AuthController = require('../controller/users/auth.controller')
const {verifyLogin,verifyAuth} = require('../middlewares/auth.middleware')
// 用户登录
authRouter.post('/api/login', verifyLogin, AuthController.login)
//权限验证验证是否授权  
//暂时无意义
authRouter.get('/api/verify',verifyAuth, AuthController.auth)

module.exports = authRouter