const DB = require('../mongodb/db')

const md5password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../config/key')

/**
 * 验证登录的逻辑中间件
 * @module verifyLogin
 * 
 */
const verifyLogin = async(ctx,next)=>{
    let { username,password} = ctx.request.body
    
    const result = await DB.findOne('users', 
    {username:username} 
   )
    
   const user = result[0]
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
   // 判断用户名是否存在
  // console.log(username);


    if ( !user ) {
        ctx.body = {
            code:400,
            msg:'登录失败用户不存在！'
        }
        return
    }

    //判断密码与数据库中加密密码是否一致
    if (md5password(password) !== user.password ) {
        ctx.body = {
            status:400,
            msg:'密码输入错误，请重新输入'
        }
        return
    }

   } catch (error) {
       ctx.body = {
        code: 500,
        msg: '登录失败，服务器繁忙！'
        }
  }

    ctx.user = user

    await next()
}




/**
 * Token采用非对称加密，私钥加密，公钥验证，此中间件用于使用公钥验证token，
 * @module verifyAuth
 * @param {*} ctx 
 * @param {*} next 
 */
const verifyAuth = async(ctx,next) =>{
    // 获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer','')

    // 验证token
    try {
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        
        ctx.user = result 
        
        await next()

    } catch (error) {
        ctx.body={
            code: 500,
            msg: '登录失败，用户未授权！'
        }
    }

}

module.exports= {
    verifyLogin,
    verifyAuth
}