'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
class HomeController extends Controller {
    // 登录页
    async login() {
        let {
            ctx
        } = this
        let toast = ctx.cookies.get('toast', {
            encrypt: true
        });
        toast = toast ? JSON.parse(toast) : null
        await ctx.render('admin/home/login.html', {
            toast
        })
    }
    // 登录逻辑
    async loginevent() {
        const {
            ctx,
            app
        } = this;
        // 参数验证
        ctx.validate({
            username: {
                type: 'string',
                required: true,
                desc: '用户名'
            },
            password: {
                type: 'string',
                required: true,
                desc: '密码'
            },
        });

        let {
            username,
            password
        } = ctx.request.body

        let manager = await app.model.Manager.findOne({
            where: {
                username
            }
        })
        if (!manager) {
            ctx.throw(400, '用户不存在或已被禁用')
        }

        // 密码验证
        await this.checkPassword(password, manager.password)

        // 存储session中
        ctx.session.auth = manager

        return ctx.apiSuccess('ok')
    }

    // 验证密码
    async checkPassword(password, hash_password) {
        // 先对需要验证的密码进行加密
        const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
        hmac.update(password);
        password = hmac.digest("hex");
        let res = password === hash_password;
        if (!res) {
            this.ctx.throw(400, '密码错误');
        }
        return true;
    }
    //退出登录
    async logout(){
        const { ctx } =this
        ctx.session.auth = null //清除存储
        ctx.toast('退出成功')
        ctx.redirect(`/admin/login`)
    }
}

module.exports = HomeController;