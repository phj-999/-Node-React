'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    //创建表
    await queryInterface.createTable('users', {
      id: { 
        //int类型 20个（长度20） UNSIGNED：无符号
        type: INTEGER(20).UNSIGNED,
        //主键
        primaryKey: true, 
        //指针  每创建就加1
        autoIncrement: true 
      },
      username: {
        //用户名30以内
        type:STRING(30),
        //不允许为空，并给一个默认值否则会报错
        allowNull:false, defaultvalue:'',
        //备注  
        comment: '用户名称', 
        //唯一的
        unique: true},
      password: {type:STRING(200), allowNull: false, defaultvalue: ''},
      avatar_url: {type:STRING(200), allowNull:true, defaultvalue: ''},
      sex:{ 
        //枚举类型
        type: ENUM, 
        values: ['男','女','保密'], 
        allowNull: false, 
        defaultvalue:'男', 
        comment:'用户性别'
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
