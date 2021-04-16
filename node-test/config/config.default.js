/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618381821470_7274';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  
    // 关闭csrf开启跨域
    config.security = {
      // 关闭 csrf
      csrf: {
        enable: false,
      },
      // 跨域白名单
      domainWhiteList: [],
    };
    // 允许跨域的方法
    config.cors = {
      origin: '*',
      allowMethods: 'GET, PUT, POST, DELETE, PATCH'
    };
//编写 sequelize 配置
config.sequelize = {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      //数据库名字
      database: 'eggapi',
      
      username: 'root',
      password: '123456',

       // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      //paranoid: true,
      //创建时间
      createdAt: 'created_at',
//更新时间
      updatedAt: 'updated_at',
      //deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true
    }
    };
  return {
    ...config,
    ...userConfig,
  };
};

// module.exports = {
//   onerror: {
//     // 线上页面发生异常时，重定向到这个页面上
//     errorPageUrl: '/50x.html',
//   },
// };
