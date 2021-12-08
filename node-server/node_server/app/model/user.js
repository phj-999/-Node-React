const crypto = require("crypto");

module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const User = app.model.define("user", {
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
      set(val) {
        const hmac = crypto.createHash("sha256", app.config.crypto.secret);
        hmac.update(val);
        let hash = hmac.digest("hex");
        this.setDataValue("password", hash);
      },
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

    createTime: {
      type: DATE,
      get() {
        return app.formatTime(this.getDataValue("createTime"));
      },
    },
    updateTime: DATE,
  });
  return User;
};
