"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = Sequelize;
    await  queryInterface.createTable("user", {
      id: {
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING(30),
        allowNull: false,
        defaultValue: "",
        comment: "用户名",
        unique: true,
      },
      password: {
        type: STRING(64),
        allowNull: false,
        defaultValue: "",
        comment: "密码",
      },
      phone: {
        type: STRING(20),
        allowNull: true,
        comment: "电话",
      },
      mbox: {
        type: STRING(64),
        allowNull: true,
        defaultValue: "",
        comment: "邮箱",
      },
      sign: {
        type: STRING(300),
        allowNull: true,
        defaultValue: "",
        comment: "用户签名",
      },
      avatar: {
        type: STRING,
        allowNull: true,
        defaultValue: "",
        comment: "头像",
      },
      createTime: DATE,
      updateTime: DATE,
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
