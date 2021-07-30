/**
 * 注册时候，邮箱发送发送验证码
 * @module Sendemail
 */

const nodemailer = require("nodemailer");

// 创建发送方的信息配置
const Email = require('../../config/verifycationCode')

class SendemailController {

  async main(ctx, next) {

    let transporter = nodemailer.createTransport({
      host: Email.host,
      port: Email.port,
      secure: false,
      auth: {
        user: Email.user,
        pass: Email.pass
      },
    });

    // 发送对象的信息及发送主体
    let mailOptions = {
      from: '"YUMusic" <865779043@qq.com>',
      to: ctx.request.body.email,
      subject: "Hello ✔这是YUMusic的注册验证码",
      html: `<h1>您的注册验证码是</h1>
    <h2>${Email.VerifycationCode}</h2>,
    <h1>5分钟内有效</h1>`
    }

    try {
      await transporter.sendMail(mailOptions, (error) => {

         //console.log(ctx.request.body.email,mailOptions.text);

         if (error) {
          console.log(error);
          return;
      }
      console.log('Message sent');
      transporter.close();
          
        // }
      });

      console.log(Email.VerifycationCode);
      // 把验证码存储到session中
      ctx.session.verifycationCode = Email.VerifycationCode
      // 存储过期时间5分钟
      ctx.session.expiretime = new Date().getTime() + 5 * 60 * 1000

      ctx.body = {
        code: 200,
        msg: 'ok，验证码已发送，有效期5分钟，可能会有延时',
        data: mailOptions.html
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'fasle,邮箱验证码发送失败！',
        data: `${error}`
      }
    }



  }


}

module.exports = new SendemailController()