/**
 * md5加密
 * @method 
 * @param {String} password 获取到的用户输入的密码
 * @return {String} 加密后的密码
 * @desc 根据用户输入密码生成加密后的密码
 */

const crypto = require('crypto');

const md5password = (password)=>{

    const md5 = crypto.createHash('md5')//返回md5对象

    const result = md5.update(password).digest('hex')//转成16进制

    return result
}

module.exports = md5password