"use strict";

const Controller = require("egg").Controller;
const md5 = require("md5");

class UserController extends Controller {
  /**
   * 用户注册
   */
  async register() {
    const { ctx, app } = this;
    //判断是否存在此用户
    const parmas = ctx.params();
    
    const user = await ctx.service.user.getuser(parmas.username);

    if (user) {
      ctx.fail(400,'用户已存在')
      return
 }  

  //   ctx.validate({
  //     username:{
  //       type: 'string',
  //       required: true,
  //       range: {
  //         min: 1,
  //         max: 30
  //     },
  //     desc: '用户名'
  //     },

  //     password:{
  //       type: 'string',
  //       required: true,
  //       range: {
  //         min: 6,
  //         max: 64
  //     },
  //       desc: '密码'
  //   },

  //   repassword:{
  //     type: 'string',
  //     required: true,
  //     desc: '确认密码'
  // }
  //   })

    
//验证密码是否输入一致
//if(password !== repassword) ctx.throw(422,'密码和确认密码不一致')

// 创建用户
    const result = await ctx.service.User.add({
      ...parmas,
     // createTime
    });

    if (result) {
      //生成token
      result = JSON.parse(JSON.stringify(user))
      result.token = await ctx.getToken({id: result.id,
        username: result.username})

      ctx.sucess(result)
    } else {
      ctx.throw(400,'创建用户失败')
    }
  }

  /**登录 */
  async login() {
    const { ctx,app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getuser(username, password);

    if (user) {


      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ["password"]),
          createTime: ctx.helper.timestamp(user.createTime),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: "用户不存在",
      };
    }
  }
}

module.exports = UserController;
