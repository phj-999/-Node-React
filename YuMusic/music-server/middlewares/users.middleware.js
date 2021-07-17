const DB = require('../mongodb/db')

const md5password = require('../utils/password-handle')

/**
 *  验证注册逻辑的中间件
 * @module verifyusers
 */

const verifyusers = async (ctx, next) => {
    //获取信息
    let {
        username,
        password
    } = ctx.request.body
    console.log(username, password);

    try {
        // 判断用户名或密码不能为空
        if (!username || !password || username === '' || password === '') {
            ctx.body = {
                code: 401,
                msg: '注册失败，账户或密码不能为空！'
            }
            return
        }

        // 判断这次注册的用户名是没有被注册过的
        const result = await DB.findOne('users', {
            username
        })

        //console.log(result);

        console.log(result[0].username, result[0].password);


        if (result[0].username) {
            ctx.body = {
                code: 300,
                msg: '用户名已经存在,请重新输入用户名'
            }
            return
        }

    } catch (error) {
        ctx.body = {
            code: 500,
            msg: '注册失败，服务器异常！'
        }
    }

    await next() //下一个中间件如果有异步  需要用到await
}


/**
 * 密码加密的中间件
 * @module handlePassword 
 */
const handlePassword = async (ctx, next) => {
    //拿到password
    const {
        password
    } = ctx.request.body

    //加密
    ctx.request.body.password = md5password(password)

    await next()
}



module.exports = {
    verifyusers,

    handlePassword,
}