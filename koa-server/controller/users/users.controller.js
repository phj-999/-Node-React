const DB = require('../../mongodb/db')
const createTime = require('../../utils/create-time')

/**
 * 用户注册的controller
 * @classdesc UsersController
 */
class UsersController {
    /**
     * 用户注册，添加用户
     * @param {String || Number} ctx 
     * @param {*} next 
     */
    async addUser(ctx, next) {
        const {
            username,
            password,
            age,
            sex,
            telephone,
            email,
        } = ctx.request.body

        let user = {
            username,
            password,
            age,
            sex,
            telephone,
            email,
            create_time: createTime()
        }

        await DB.insertOne('users', user)

        let feedback

        try {
            feedback = {
                code: 200,
                msg: '注册成功',
                data: {
                    username
                }
            }
        } catch (error) {
            console.log(error);
            feedback = {
                code: 500,
                msg: 'server error'
            }
        }

        ctx.body = feedback

    }
}

module.exports = new UsersController()