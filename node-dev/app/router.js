'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //后台首页
  router.get('/admin', controller.admin.home.index)
  // 创建管理员的页面
  router.get('/admin/manager/create', controller.admin.manager.create);
  // 创建
  router.post('/admin/manager', controller.admin.manager.save);
  // 管理员列表
  router.get('/admin/manager', controller.admin.manager.index);
  // 删除delete
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete);
  //修改管理员之编辑
  router.get('/admin/manager/edit/:id', controller.admin.manager.edit);
  //修改管理员之发送
  router.post('/admin/manager/:id', controller.admin.manager.update);
  //登录页面
  router.get('/admin/login', controller.admin.home.login);
  //登录逻辑（存储、验证） 
  router.post('/admin/loginevent', controller.admin.home.loginevent);
  //退出登录
  router.get('/admin/logout', controller.admin.home.logout)

  //用户模块--创建用户表单
  router.get('/admin/user/create', controller.admin.user.create);
  router.post('/admin/user', controller.admin.user.save);
  //用户列表
  router.get('/admin/user', controller.admin.user.index);
  //编辑用户
  router.get('/admin/user/edit/:id', controller.admin.user.edit);
  //编辑用户之发送
  router.post('/admin/user/:id', controller.admin.user.update);
  //删除用户
  router.get('/admin/user/delete/:id', controller.admin.user.delete);


  //创建礼物
  router.get('/admin/gift/create', controller.admin.gift.create);
  //创建的post逻辑
  router.post('/admin/gift', controller.admin.gift.save);
  //礼物列表
  router.get('/admin/gift', controller.admin.gift.index);
  //修改礼物
  router.get('/admin/gift/edit/:id', controller.admin.gift.edit);
  //修改礼物更新逻辑
  router.post('/admin/gift/:id', controller.admin.gift.update);
  //删除礼物
  router.get('/admin/gift/delete/:id', controller.admin.gift.delete);
  //上传文件
  router.post('/admin/upload', controller.admin.common.upload);
  //订单列表
  router.get('/admin/order', controller.admin.order.index);
  //删除订单
  router.get('/admin/order/delete/:id', controller.admin.order.delete);
  //直播间列表
  router.get('/admin/live', controller.admin.live.index);
  //直播间观看记录
  router.get('/admin/live/look/:id', controller.admin.live.look);
  //直播间礼物记录
  router.get('/admin/live/gift/:id', controller.admin.live.gift);
  //直播间评论（弹幕）
  router.get('/admin/live/comment/:id', controller.admin.live.comment);
  //关闭直播间
  router.get('/admin/live/close/:id', controller.admin.live.close);
  //删除直播间
  router.get('admin/live/delete/:id', controller.admin.live.delete)
  //api--注册
  router.post('/api/reg', controller.api.user.reg);
  //api-登录
  router.post('/api/login', controller.api.user.login);
  //api-退出登录
  router.post('/api/logout', controller.api.user.logout);
  //获取当前用户信息
  router.get('/api/user/info', controller.api.user.info);
  //创建直播间
  router.post('/api/live/create', controller.api.live.save);
  //修该直播间状态
  router.post('/api/live/changestatus', controller.api.live.changestatus);
  //直播间列表
  router.get('/api/live/list/:page', controller.api.live.list);
  // 查看直播间
  router.get('/api/live/read/:id', controller.api.live.read);
  //微信支付
  router.get('/api/gift/wxpay', controller.api.gift.wxpay)
  //微信支付回调
  router.post('/api/gift/notify', controller.api.gift.notify)
};
