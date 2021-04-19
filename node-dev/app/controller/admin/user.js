'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    //用户模块--创建用户表单
    async create() {
        const {
            ctx,
            app
        } = this;
        await ctx.renderTemplate({
            title: "创建用户",
            tempType: "form",
            form: {
                // 提交地址
                action: "/admin/user",
                fields: [{
                    label: "用户名",
                    type: "text",
                    name: "username",
                    placeholder: "用户名",
                }, {
                    label: "密码",
                    type: "text",
                    name: "password",
                    placeholder: "密码"
                }, {
                    label: "头像",
                    type: "file",
                    name: "avatar",
                    placeholder: "头像"
                }, {
                    label: "金币",
                    type: "number",
                    name: "coin",
                    placeholder: "金币"
                }]
            },
            // 成功跳转路径
            successUrl: "/admin/user"
        })
    }

    async save() {
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
            avatar:{
                type:"string",
                required:false,
                desc:"头像"
            },
            coin:{
                type:"int",
                required:true,
                defValue:0,
                desc:"金币"
            },
        });
        let {
            username,
            password,
            avatar,
            coin
        } = ctx.request.body;

        // 验证用户是否已经存在
        if (await app.model.User.findOne({
                where: {
                    username
                }
            })) {
            ctx.throw(400, '用户名已存在');
        }
        // 创建用户
        let user = await app.model.User.create({
            username,
            password,
            avatar,
            coin
        });
        if (!user) {
            ctx.throw(400, '创建用户失败');
        }
        ctx.apiSuccess(user);
    }

    //用户模块--用户列表
    async index() {
        //解构
        const { ctx, app } = this
        //page是分页功能
        //本来没有page的方法  所以要在拓展中定义
        let list = await ctx.page('User')

        // let list = await ctx.page('User',{},{
        //     order:[['id','desc']]
        // }) 第二个参数where查询条件  第三个参数options可以排序
        //拿到相应的数据 (此处已经创建好了用户，所以要从数据库中拿到数据)
        //传入limit offset参数实现分页
        //let list = await app.model.User.findAndCountAll({offset,limit})
        await ctx.renderTemplate({
            title:"用户列表",
            tempType: "table",
            table:{
                // 按钮
                buttons: {
                    // 新增操作
                    add: "/admin/user/create"
                },
                // 表头
                columns:[{
                    title:"用户名",
                    fixed: 'left',
                    //图像和名称、简介一起显示
                    render(item) {
                        let avatar = item.avatar ? item.avatar : '/public/assets/img/profiles/avatar-03.jpg'
                        return ` <h2 class="table-avatar">
                        <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="${avatar}"></a>
                        <a href="profile.html">${item.username}</a>
                    </h2>`
                    },
                },{
                    title:"金币",
                    fixed: 'center',
                    width: 180,
                    key:"coin"
                },
                {
                    title: '时间',
                    key: 'created_time',
                    width: 180,
                    fixed: 'center'
                },{
                    title: "操作",
                    width: 200,
                    fixed: 'center',
                    action:{
                        edit:function(id){
                            return `/admin/user/edit/${id}`
                        },
                        delete:function(id){
                            return `/admin/user/delete/${id}`
                        },
                    }
              }]
            },
            list
        })
  }

  //修改管理员之编辑表单页
async edit(){
    const { ctx, app } = this
    const id = ctx.params.id
    
    let data = await app.model.User.findOne({
        where:{
            id
        }
    })
    
    if ( !data ) {
        return await ctx.pageFail('该记录不存在')
        }
        data = JSON.parse(JSON.stringify(data))
        delete data.password
        
        await ctx.renderTemplate({
            id, 
            title:'修改用户',
            tempType:'form',
            form: {
                //提交地址
                action: "/admin/user/" + id,
                //字段配置
                fields:[{
                    label: "用户名",
                    type: "text",
                    name: "username",
                    placeholder: "用户名",
                }, {
                    label: "密码",
                    type: "text",
                    name: "password",
                    placeholder: "密码"
                }, {
                    label: "头像",
                    type: "file",
                    name: "avatar",
                    placeholder: "头像"
                }, {
                    label: "金币",
                    type: "number",
                    name: "coin",
                    placeholder: '金币',
                   // default: 0
                }],
                //默认值
                data
            },
            successUrl:"/admin/user"
        })
    }
    //修改管理员之更新了逻辑
    async update() {
        const { ctx, app } = this
        ctx.validate({
            id:{
                type:'int',
                required:true
            },
            username:{
                type:'string',
                required:true,
                desc:'用户名称'
            },
            password:{
                type:'string',
                required:false,
                desc:'密码'
            },
            avatar:{
                type:"string",
                required:false,
                desc:"头像"
            },
            coin:{
                type:"int",
                required:true,
                
                desc:"金币"
            },
        })
        //拿到数据
        let id = ctx.params.id
        let {username, password, avatar, coin } = ctx.request.body
    
         //当前管理员是否已经存在
        let user = await app.model.User.findOne({
            where:{
                id
            }
        })
        if (!user) {
            return ctx.apiFail('该记录不存在')
        }
        
        const Op = app.Sequelize.Op
    
        if (await app.model.User.findOne({ //判断传过来的username是否已经存在
            where: {
                id:{
                    [Op.ne]:id,
                },
                username
            }
        })) {
            return ctx.apiFail('用户已经存在')
            }
    
            //修改
        user.username = username 
        if (password) {
           user.password = password
        }
        //更新成功
        ctx.apiSuccess(await user.save())
    
        }

//删除管理员
async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id; // 拿到传过来的参数id
    await app.model.User.destroy({
      where: {
        id,
      },
    });
    ctx.toast('删除成功', 'success');
    ctx.redirect('/admin/user');
  }


















}

module.exports = UserController;