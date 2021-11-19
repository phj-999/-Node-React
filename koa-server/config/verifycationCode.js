/**
 * nodemailer配置，用于使用qq邮箱发送给注册用户验证码
 * @module verifycationCode
 */
const getValidateString = require('../utils/random-code')

const Email = {
    host: 'smtp.qq.com',
    port: 587,
    user: '865779043@qq.com', 
    pass:'fjbqtepqtlyqbbcd',
    VerifycationCode: getValidateString()
}

module.exports=  Email