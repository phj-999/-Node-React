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
  //
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
  
};
