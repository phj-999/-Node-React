
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
        const {username} = ctx.request.body
       
        let feedback

        try {
            feedback = {
                code: 200,
                msg: '登录成功',
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
}
module.exports = new AuthController()