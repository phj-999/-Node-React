"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  /**
   * 用户注册
   */
  async register() {
    const { ctx, app } = this;
    //判断是否存在此用户
    const parmas = ctx.params();

    const user = await ctx.service.user.getUser(parmas.username);

    if (user) {
      ctx.fail("用户已存在");
      return;
    }

    try {
      ctx.validate({
        username: {
          type: "string",
          required: true,
          range: {
            min: 1,
            max: 30,
          },
          desc: "用户名",
        },

        password: {
          type: "string",
          required: true,
          range: {
            min: 6,
            max: 64,
          },
          desc: "密码",
        },

        repassword: {
          type: "string",
          required: true,
          desc: "确认密码",
        },
      });
    } catch (error) {
      ctx.valiFail(error);
      return;
    }

    //验证密码是否输入一致
    if (parmas.password !== parmas.repassword)
      ctx.throw(422, "密码和确认密码不一致");

    // 创建用户
    const result = await ctx.service.user.add({
      ...parmas,
    });

    if (result) {
      //生成token
      result.token = await ctx.getToken({
        id: result.id,
        //username: result.username,
      });
      //let token = result.token;
      ctx.success({
         result,
         //token 
        });
    } else {
      ctx.throw(400, "创建用户失败");
    }
  }

  /**登录 */
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username);

    if (!user) ctx.throw(400, "该用户不存在");

    // 验证密码
    await ctx.checkPassword(password, user.password);

    //user = JSON.parse(JSON.stringify(user))
    user.token = await ctx.getToken({
      id: user.id,
    });
    let token = user.token;
    const userMsg = {token:token,username:username}
    //加入redis
    if (
      !(await this.service.redisCache.set(
        "user_" + user.id,
        {userMsg},
        app.config.redisExpire
      ))
    )
      ctx.throw(400, "登录失败");
    ctx.success({ user, token }, "登陆成功");
  }

  async edit() {
    const { ctx, app } = this;
    const user = ctx.authUser;
    let t = await ctx.service.redisCache.get("user_" + user.id);
    //传来的修改数据
    const parmas = ctx.params();
    const {username} = parmas
    const Op = app.Sequelize.Op

    try {
      const nusername = await ctx.model.User.findOne({
        where:{
          id:{
            [Op.ne]:user.id
          },
          username
        }
      })

     if (nusername) {
       ctx.fail('该用户名已存在')
       return
     }
 
     if (t.userMsg.username) {
       return true
     }

      await ctx.service.user.edit({
        ...parmas,
      });
      const result = await ctx.model.User.findOne({ where: ctx.authUser.id });
      //console.log(result, "rererererererer");
      ctx.success({  result, token: t.userMsg.token });
    } catch (error) {
      ctx.throw(error);
    }
  }
  //获取当前用户信息
  async detail(){
    const { ctx } = this;
    let user = ctx.authUser
    return ctx.apiSuccess(JSON.parse(JSON.stringify(user)))
  }
  //退出
  async logout (){
    const {ctx,app} =this
    const user = ctx.authUser;
    //let t = await ctx.service.redisCache.get("user_" + user.id);
    try {
      await ctx.service.user.remove("user_" + user.id)
      ctx.success('退出登录')
    } catch (error) {
      ctx.throw(400,'退出登录失败')
    }
  }

}

module.exports = UserController;
