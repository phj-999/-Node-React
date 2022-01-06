'use strict';
const path = require('path');

module.exports={
  //egg-jwt
  jwt:{
    enable: true,
    package: "egg-jwt"
  },
  // egg-sequelize 插件
  sequelize:{
    enable: true,
    package: 'egg-sequelize',
  },
  //redis
  redis : {
    enable: true,
    package: 'egg-redis',
  },
  //参数验证
  valparams : {
    enable : true,
    package: 'egg-valparams'
  }
}
