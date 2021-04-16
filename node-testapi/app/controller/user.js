'use strict';

const Controller = require('egg').Controller;
let demo = [{
    id: 1,
    username: "用户名1",
    nickname: "昵称",
    sex: "男"
}, {
    id: 2,
    username: "用户名2",
    nickname: "昵称",
    sex: "男"
}, {
    id: 3,
    username: "用户名3",
    nickname: "昵称",
    sex: "男"
}, {
    id: 4,
    username: "用户名4",
    nickname: "昵称",
    sex: "男"
}];
class UserController extends Controller {
    // 用户列表
    async index() {
        // 拿到数据
        let result = demo;
        // 获取url的问号get传值参数
        this.ctx.query.page;
        // 响应
        this.ctx.body = {
            msg: 'ok',
            data: result
        };
        // 修改状态码
        this.ctx.status = 201;
    }

    // 读取某个用户数据
    async read() {
        let id = parseInt(this.ctx.params.id);
        //let detail = demo.find(item => item.id == id);
        //根据主键查询
        let detail = await this.app.model.User.findBypk(id)

if (!detail) {
    return this.ctx.body = {
        msg:"fail",
        data:"用户不存在"
    }
} else {
    
}

      this.ctx.body= {
          msg:'ok',
          data: detail
      }
    }

    // 创建用户
    async create() {
      
        let res = await this.app.model.User.bulkCreate()

        // 成功
        this.ctx.body = res;
    }
}

module.exports = UserController;
