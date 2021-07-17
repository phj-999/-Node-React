const DB = require('../mongodb/db')
const md5password = require('../utils/password-handle')

/**
 * 验证登录的逻辑中间件
 * @module verifyLogin
 * 
 */
const verifyLogin = async(ctx,next)=>{
    let { username,password} = ctx.request.body

//console.log(password,md5password(password));
try {
    // 判断用户名或密码不能为空
if (!username || !password || username==='' ||password==='') {
    ctx.body = {
        code:'400',
        msg:'登录失败，用户名或密码不能为空'
      }
      return
}
   } catch (error) {
       ctx.body = {
        code: 500-13,
        msg: '登录失败，服务器繁忙！'
        }
  }


  

    // 判断用户是否存在
    // const result = await DB.findOne('users',{username})

    // console.log(result[0].username);


    await next()
}

module.exports= {
    verifyLogin
}