module.exports = {
  // 成功提示
  success(data = "", msg = "ok", code = 200) {
    this.body = { msg, data };
    this.status = code;
  },
  // 失败提示
  fail(data = "", msg = "fail", code = 400) {
    this.body = { msg, data };
    this.status = code;
  },
  // 生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },
  //验证token
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
  //
  params(key){
    const method = this.request.method
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }else{
      return key ? this.request.body[key] : this.request.body;
    }
  }
};
