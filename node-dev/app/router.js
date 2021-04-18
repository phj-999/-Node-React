'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 创建管理员的页面
  router.get('/admin/manager/create', controller.admin.manager.create);
  // 创建
  router.post('/admin/manager', controller.admin.manager.save);
  // 用户列表
  router.get('/admin/manager', controller.admin.manager.index);
  // 删除delete
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete);
  //404
  router.get('/admin/manager/edit/:id',controller.admin.manager.edit);
  //修改管理员之更新逻辑
  router.post('/admin/manager/:id',controller.admin.manager.update)
};
