const Router = require('koa-router')
const userRouter = new Router()
const {users} = require('../controller/users.controller')

const {
    handlePassword
} = require ('../middlewares/users.middleware')

userRouter.post('/api/users', handlePassword, users.addUser)


module.exports = userRouter