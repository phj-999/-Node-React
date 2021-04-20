'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const {
            INTEGER,
            STRING,
            DATE,
            ENUM,
            TEXT
        } = Sequelize;
        return queryInterface.createTable('order', {
            id: {
                type: INTEGER(20),
                primaryKey: true,
                autoIncrement: true
            },
            no: {//订单号  唯一
                type: STRING(100),
                allowNull: false,
                defaultValue: '',
                comment: '订单号',
                unique: true
            },
            user_id: { //用户id
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
            status: {  //状态： 支付中、成功、失败
                type: ENUM,
                values: ['pending', 'success', 'fail'],
                allowNull: false,
                defaultValue: 'pending',
                comment: '支付状态'
            },
            created_time: DATE,
            updated_time: DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('order');
    }
};