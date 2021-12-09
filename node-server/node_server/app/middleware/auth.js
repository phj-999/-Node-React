/**
 * token权限验证中间件
 *
 */
module.exports = (options, app) => {
  return async (ctx, next) => {
    //获取token
    let token = ctx.header.token || ctx.query.token;
    if (!token) ctx.throw(400, "您没有权限访问该接口!");
    //根据token解密，换取用户信息
    let user = {};
    try {
      user = ctx.checkToken(token);
    } catch (error) {
      let fail =
        (error.name === "TokenExpiredError"
          ? "token 已过期! 请重新获取令牌"
          : "Token 令牌不合法!");
      ctx.throw(400, fail);
    }

    //判断当前用户是否登录(redis中有无userid)
    let t = await ctx.service.redisCache.get("user_" + user.id);
    //console.log(t.userMsg.token);
    if (!t.userMsg.token || t.userMsg.token !== token) ctx.throw(400, "Token 令牌不合法!");

    //获取当前用户，通过主键来查询、验证当前用户是否被禁用
    user = await app.model.User.findByPk(user.id);
    if (!user) {
      ctx.throw(400, "用户不存在或已被禁用");
    }

    //把 user 信息挂载到全局ctx上
    ctx.authUser = user;

    await next();
  };
};
