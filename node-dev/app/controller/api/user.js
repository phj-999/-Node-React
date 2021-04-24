'use strict';

const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 注册
    async reg() {
        let { ctx,app } = this
        ctx.validate({
            username:{
                type: 'string',
                required: true,
                range: {
                    min: 5,
                    max: 20
                },
                desc: '用户名'
            },
            password:{
                type: 'string',
                required: true,
                desc: '密码'
            },
            repassword:{
                type: 'string',
                required: true,
                desc: '确认密码'
            }
        })

        let { username,password,repassword } = ctx.request.body

        if(password !== repassword){
            ctx.throw(422,'密码和确认密码不一致')
        }

        // 验证用户是否已经存在
        if((await app.model.User.findOne({
            where:{
                username
            }
        }))){
            ctx.throw(400,'该用户名已存在')
        }

        let user = await app.model.User.create({
            username,
            password
        })

        if(!user){
            ctx.throw(400,'创建用户失败')
        }

        ctx.apiSuccess(user)
    }

    // 登录
    async login() {
        const { ctx, app } = this;
        // 参数验证
        ctx.validate({
            username:{
                type: 'string',
                required: true,
                desc: '用户名'
            },
            password:{
                type: 'string',
                required: true,
                desc: '密码'
            },
        })

        let { username, password } = ctx.request.body;

        let user = await app.model.User.findOne({
            where:{
                username
            }
        })

        if(!user){
            ctx.throw(400,'该用户不存在')
        }

        // 验证密码
        await ctx.checkPassword(password,user.password)

        user = JSON.parse(JSON.stringify(user))

        // 生成token
        user.token = ctx.getToken(user)
        delete user.password

        // 加入到存储中
        if(!(await this.service.cache.set('user_' + user.id,user.token))){
            ctx.throw(400,'登录失败')
        }

        ctx.apiSuccess(user)
    }

//退出登录
async logout (){
    const {ctx,service} = this
    //拿到当前的用户ID
    let current_user_id = ctx.authUser.id
    //移除redis当前用户的信息
    if (!await service.cache.remove('user_' + current_user_id)) {
        ctx.throw(400,'退出登录失败')
    }
ctx.apiSuccess('退出登录')
}


//获取当前用户信息
async info(){
    const { ctx, service, app } = this;
    let user = ctx.authUser
    return ctx.apiSuccess(JSON.parse(JSON.stringify(user)))
}




























}

module.exports = UserController;
