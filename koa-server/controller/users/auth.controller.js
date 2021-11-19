const jwt = require('jsonwebtoken')

const 
   { PRIVATE_KEY}
 = require ('../../config/key')
/**
 * 用户登录的controller
 * @classdesc AuthController
 */
class AuthController {
    /**
     * 用于用户登录login
     * @param {*} ctx 
     * @param {*} next 
     */
    async login(ctx,next){
        //
        const {_id,username} = ctx.user

        const token = jwt.sign({_id,username},PRIVATE_KEY,{
            expiresIn:60*60*24,
            algorithm:'RS256'
        })
       
        let feedback

        try {
            feedback = {
                code: 200,
                msg: '登录成功',
                token,
                data: `登录成功，欢迎${username}`
                
            }
        } catch (error) {
            console.log(error);
            feedback = {
                code: 500,
                msg: 'server error'
            }
        }

        ctx.body = feedback
    }

    async auth(ctx,next){
        ctx.body = '已授权'
    }
}
module.exports = new AuthController()