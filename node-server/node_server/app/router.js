"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  //const userExist = app.middleware.userExist();

  //用户注册
  router.post("api/user/register", controller.user.register);
  //用户登录
  router.post("api/user/login", controller.user.login);
};
