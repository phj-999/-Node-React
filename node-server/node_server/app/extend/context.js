const crypto = require('crypto');

module.exports = {
  // 成功提示
  success(data = "", msg = "ok", code = 200) {
    this.status = code;
    this.body = { code, msg, data };
  },

  // 失败提示
  fail(data = "", msg = "fail", code = 400) {
    this.status = code;
    this.body = { code, msg, data };
  },

  //valparams验证失败返回提示
  valiFail(error) {
    const { message, code, errors } = error;
    const es = errors
      .map((item) => {
        return item.err;
      })
      .flat()[0]
      .replace(/\s*/g, "");
    this.body = { message, code, es };
  },

  // 生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },
  //验证token
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
  
  //获取参数
  params(key) {
    const method = this.request.method;
    if (method === "GET") {
      return key ? this.query[key] : this.query;
    } else {
      return key ? this.request.body[key] : this.request.body;
    }
  },

  //验证密码
  async checkPassword(password,hash_password){
    const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest("hex");
    password === hash_password;
    // console.log(password);
    // console.log(hash_password);
    if (!(password === hash_password)) {this.throw(400, '密码错误')};
    return true;
  }
};
