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

class NameController extends Controller {
    //获取用户列表
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
        let id = this.ctx.params.id;
        let detail = demo.find(item => item.id == id);
        this.ctx.body = {
            msg: 'ok',
            data: detail
        };
    }

    // 创建用户
    async create() {
        // 参数验证
        // 写入数据库
        console.log(this.ctx.request.body);
        // 成功
        this.ctx.body = {
            msg: "ok",
            data: {
                username: "用户名",
                nickname: "昵称"
            }
        };
    }
}
   
module.exports = NameController;