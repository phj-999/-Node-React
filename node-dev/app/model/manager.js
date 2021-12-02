const crypto = require('crypto');

module.exports = app => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = app.Sequelize;
  
    const Manager = app.model.define('manager', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '管理员账户',
            unique: true
          },
          password: {
            type: STRING,
            allowNull: false,
            defaultValue: '',
            comment: "密码",
            //加密
            set(val) {
              const hmac = crypto.createHash("sha256", app.config.crypto.secret);
              hmac.update(val);
              let hash = hmac.digest("hex");
              this.setDataValue('password', hash);
          }
          },
          //创建时间
          created_time:{ 
            type:DATE,
            //拿到时间的值
            get(){
              return app.formatTime(this.getDataValue('created_time'))
            }
          },
          //更新时间
          updated_time: DATE,
    //       timestamps: true, // 是否自动写入时间戳
    // tableName: 'manager', // 自定义数据表名称
    });
  
    return Manager;
  };