"use strict";
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_{{keys}}";

  const userConfig = {
    // myAppName: 'egg',
    redisExpire: 60 * 60 * 24
  };
  config.security = {
    // csrf
    csrf: {
      headerName: 'x-csrf-token',
      ignore: ctx => {
        return ctx.request.url.startsWith('/api')
      },
    },
    // 跨域白名单
    // domainWhiteList: ['http://localhost:3000'],
  };
  // add your config here
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  };

  config.middleware = ["errorHandle",'auth'];

  config.errorHandle= {
    match: '/api',
  };
  //password加密
  config.crypto = {
    secret: "mimajiami123%*&^321secret",
  };
  //jwt鉴权
  config.jwt = {
    secret: "jiamihahaha", //密钥
  };

  //redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: "127.0.0.1", // Redis host
      password: "",
      db: 0,
    },
  };

  //token权限验证中间件匹配的路由
  config.auth={
    match:[
      '/api/logout',
      '/api/user/info',
      '/api/user/edit'
    ]
  }

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    database: "egg_house",
    username: "root",
    password: "123456",
    timezone: "+08:00",
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: "createTime",
      updatedAt: "updateTime",
      // deletedAt: 'deleted_time',
      // 所有驼峰命名格式化
      underscored: true,
    },
  };

  //参数验证
  config.valparams = {
    locale: "zh-cn",
    throwError: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
