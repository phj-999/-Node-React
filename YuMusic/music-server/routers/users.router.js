
/**
 * 用户注册的路由
 * @module userRouter
 */

const Router = require('koa-router')
const userRouter = new Router()
//const {users} = require('../controller/users.controller')
const UsersController = require('../controller/users/users.controller');
const {
    verifyusers,
    handlePassword
} = require ('../middlewares/users.middleware')

const {handleVerifycationCode}=require('../middlewares/verifycationCode.middleware')

userRouter.post('/api/users', verifyusers, handleVerifycationCode, handlePassword, UsersController.addUser)


module.exports = userRouter