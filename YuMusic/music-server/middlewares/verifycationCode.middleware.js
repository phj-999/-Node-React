/**
 * 此中间件主要是用来验证发往邮箱的验证码 和 输入的验证码 是否一致
 * 调用验证码生成接口，验证码发送至邮箱，并存储到session中
 * 从session中拿取验证码和用户输入的验证码作比较是否一致
 * @module handleVerifycationCode
 */

const handleVerifycationCode = async(ctx,next) => {

    let code  =  ctx.session.verifycationCode 
    let ccode =  ctx.request.body.verifycationCode
    
    console.log('session',code);
    console.log('ctx.request.body.verifycationCode',ccode);
    
    //拿到过期时间
    let expiretime = ctx.session.expiretime
    // 当前时间
    let nowtime = new Date().getTime()
try {
if (code===''|| code===undefined || !code) {
    ctx.body={
        code:-1,
        msg:'session中无验证码'
    }
    return
}
   if (!ccode || ccode===undefined || ccode==='' ) {
       ctx.body = {
           code: -1,
           msg: '验证码为空,请输入验证码'
         }
         return
   }

   if (nowtime-expiretime>0) {
    ctx.body = {
       code: -1,
       msg: '验证码已过期，请重新发送'
     }
     return
   }

   if (code !== ccode ) {
       ctx.body = {
          code:-1,
          msg:"验证码错误,请重新输入"
       }
       return
   }

} catch (error) {
    ctx.body = {
        code: 500,
        msg: 'fasle,验证密码验证失败！',
        data: `${error}`
      }
}

    await next()
}

module.exports = {handleVerifycationCode}

