module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        ENUM,
        TEXT
    } = app.Sequelize;

    const Order = app.model.define('order', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        no: { //商品订单号  唯一
            type: STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '订单号',
            unique: true
        },
        user_id: { //用户ID 购买时候使用
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '用户id',
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'restrict', // 更新时操作
        },
        price: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '价格'
        },
        status: { //状态： 支付中、成功、失败
            type: ENUM,
            values: ['pending', 'success', 'fail'],
            allowNull: false,
            defaultValue: 'pending',
            comment: '支付状态'
        },
        created_time: {
            type: DATE,
            get() {
                return app.formatTime(this.getDataValue('created_time'))
            }
        },
        updated_time: DATE,
    });

    // 关联关系
    Order.associate = function(models) {
        // 关联主播
        Order.belongsTo(app.model.User);
    }

    return Order;
};