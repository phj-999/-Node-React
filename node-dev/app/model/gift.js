module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;

    const Gift = app.model.define('gift', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            allowNull: false,
            defaultValue: '',
            comment: '礼物名称'
        },
        image: {
            type: STRING,
            allowNull: true,
            defaultValue: '',
            comment: '礼物图标',
            get(){
                const ctx = app.createAnonymousContext();
                const { protocol, host } = ctx.request;
                return app.config.webUrl + this.getDataValue('image')
            }
        },
        coin: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '金币'
        },
        created_time: {
            type:DATE,
            get(){
               return app.formatTime(this.getDataValue('created_time'))
            }
          },
        updated_time: DATE,

    });

    return Gift;
};