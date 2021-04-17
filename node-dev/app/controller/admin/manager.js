'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
    //创建管理员表单
    async create() {
        const { ctx, app } = this;

        //模板渲染
        await ctx.render('/admin/manager/create.html')

    }
    //创建管理员的逻辑
    async save() {
        const { ctx, app } = this
        //参数验证
        ctx.validate({
            username: { type: 'string', required: "true", desx: "管理员账户" },
            password: { type: 'string', required: "true", desx: "密码" },
        })
        let { username, password } = ctx.request.body
        //判断用户名有没有
        if ( //条件
            await app.model.Manager.findOne({

                where: {
                    username
                }
            })
        ) {

            return ctx.apiFail('该管理员已经存在')

        }
        let manager = await app.model.Manager.create({ username, password })
        ctx.apiSuccess(manager)
    }

    //列表
    async index() {
        //解构
        const { ctx, app } = this
        //page是分页功能
        //本来没有page的方法  所以要在拓展中定义
        let list = await ctx.page('Manager')

        // let list = await ctx.page('Manager',{},{
        //     order:[['id','desc']]
        // }) 第二个参数where查询条件  第三个参数options可以排序
        //拿到相应的数据 (此处已经创建好了用户，所以要从数据库中拿到数据)
        //传入limit offset参数实现分页
        //let list = await app.model.Manager.findAndCountAll({offset,limit})
        //渲染模板
        await ctx.render('admin/manager/index.html',{list})
    }
    









}

module.exports = ManagerController;