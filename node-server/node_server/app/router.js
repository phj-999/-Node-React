"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  //const userExist = app.middleware.userExist();

  //用户注册
  router.post("/api/user/register", controller.user.register);
  //用户登录
  router.post("/api/user/login", controller.user.login);
  //用户修改
  router.post('/api/user/edit',controller.user.edit)
  //获取当前用户信息
  router.get('/api/user/detail', controller.user.detail);
  //退出登录
  router.post('/api/user/logout', controller.user.logout)
  //热门
  router.post('/api/house/hot', controller.house.hot);
  //搜索
  router.post('/api/house/search', controller.house.search);
  //详情
  router.post('/api/house/detail', controller.house.detail);
  //城市列表
  router.post('/api/city/citys', controller.city.citys);
};
