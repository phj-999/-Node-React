'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  //跨域
  cors:{
    enable: true,
    package: 'egg-cors',
  },
  // egg-sequelize 插件
  sequelize : {
    enable: true,
    package: 'egg-sequelize',
  },
  //nunjucks模板引擎
  nunjucks:{
    enable: true,
    package: 'egg-view-nunjucks',
  },
  //参数验证
  valparams : {
    enable : true,
    package: 'egg-valparams'
  },
  //登录- jwt 加密鉴权 
jwt : {
    enable: true,
    package: "egg-jwt"
  },
  //redis 缓存插件
  redis : {
    enable: true,
    package: 'egg-redis',
  },
// //创建订单和微信支付
// tenpay: {
//   enable: true,
//   package: 'egg-tenpay'
// },
  
};
