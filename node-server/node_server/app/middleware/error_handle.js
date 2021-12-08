/**
 * 全局抛出异常处理
 */
module.exports = (app, options) => {
  return async function (ctx, next) {
    try {
      await next();
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: "fail",
          code: "404",
        };
      }
    } catch (err) {
      //记录一条错误日志
      ctx.app.emit("error", err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let error = status === 500 ? "服务端错误" : err.message;
      ctx.body = {
        msg: "fail",
        data: error,
      };
      ctx.status = status;
    }
  
  };
};
