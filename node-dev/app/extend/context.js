const crypto = require('crypto');

module.exports = {
  // 成功提示
  apiSuccess(data = '', msg = 'ok', code = 200) {
    this.body = { msg, data };
    this.status = code;
  },
  // 失败提示
  apiFail(data = '', msg = 'fail', code = 400) {
    this.body = { msg, data };
    this.status = code;
  },

  // 编辑管理员 页面失败提示 data错误提示
  async pageFail(data = '', code = 404) {
    //渲染404页面
    return await this.render('admin/commonTemplate/404.html', {
      data, code
    })
  },


  //拓展分页的方法
  async page(modelName, where = {}, options = {}) {
    //this 代表ctx
    let page = this.query.page ? parseInt(this.query.page) : 1
    //MySQL中每页限制条数
    let limit = this.query.limit ? parseInt(this.query.limit) : 10
    //MySQL中的offset
    let offset = (page - 1) * limit
    //第三个参数options定位的条件
    if (!options.order) {
      options.order = [['id', 'DESC']]
    }

    let res = await this.app.model[modelName].findAndCountAll({
      where,
      offset,
      limit,
      ...options
    })
    //总页码 = 总数÷每页限制显示条数
    let totalPage = Math.ceil(res.count / limit)
    //其他参数
    let query = { ...this.query }
    if (query.hasOwnProperty('page')) {
      delete query.page
    }
    if (query.hasOwnProperty('limit')) {
      delete query.limit
    }
    // 对象转&拼接字符串如
    const urlEncode = (param, key, encode) => {
      if (param == null) return '';
      var paramStr = '';
      var t = typeof (param);
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          paramStr += urlEncode(param[i], k, encode)
        }
      }
      return paramStr;
    }
    query = urlEncode(query)



    //定义一个空变量存总页数
    let pageEl = ''
    //循环页码
    for (let index = 1; index <= totalPage; index++) {
      //定义一个选中的当前页面
      let active = ''
      if (page === index) {
        active = 'active'
      }
      //总页数加
      pageEl += `<li class="page-item ${active}">
  <a class="page-link" href="?page=${index}&limit=${limit}${query}">${index}</a>
</li> `
    }
    //选中第一页的时候  左边箭头禁用
    const preDisabled = page <= 1 ? 'disabled' : ''
    //选中最后一页的时候  右边箭头禁用
    const nextDisabled = page >= totalPage ? 'disabled' : ''

    let pageRender = `
<ul class="pagination">
<li class="page-item ${preDisabled}">
    <a class="page-link" href="?page=${page - 1}&limit=${limit}${query}" aria-label="Previous">
        <span aria-hidden="true">«</span>
        <span class="sr-only">Previous</span>
    </a>
</li>

${pageEl}

<li class="page-item ${nextDisabled}">
    <a class="page-link" href="?page=${page + 1}&limit=${limit}${query}" aria-label="Next">
        <span aria-hidden="true">»</span>
        <span class="sr-only">Next</span>
    </a>
</li>
</ul>`

    //存到context中的local变量中
    this.locals.pageRender = pageRender
    //然后渲染到html中{{ctx.locals.pageRender | safe}}
    return res.rows
  },

  // 渲染公共模板
  async renderTemplate(params = {}) {

    // 获取cookie中的消息提示（闪存）
    let toast = this.cookies.get('toast', {
      // 中文需要解密
      encrypt: true
    });
    // 赋值给params
    params.toast = toast ? JSON.parse(toast) : null
    // 渲染公共模板
    //return await this.render('admin/common/template.html', params)

    await this.render('admin/commonTemplate/template.html', params)
  },

  // 消息提示 存在cookie中 msg提示内容
  toast(msg, type = 'danger') {
    this.cookies.set('toast', JSON.stringify({
      msg, type
    }), {
      maxAge: 1500, // 有效时间
      encrypt: true // 加密 官方文档中提示egg使用cookie配置
    })
  },

  // 生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },
  // 验证token
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },
  // 验证密码
  async checkPassword(password, hash_password) {
    // 先对需要验证的密码进行加密
    const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest("hex");
    let res = password === hash_password;
    if (!res) {
      this.throw(400, '密码错误');
    }
    return true;
  },
  // 验证密码
  async checkPassword(password, hash_password) {
    // 先对需要验证的密码进行加密
    const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest("hex");
    let res = password === hash_password;
    if (!res) {
      this.ctx.throw(400, '密码错误');
    }
    return true;
  },
  
  /**
   * 随机生成唯一id
   * @param {number} 随机生成的字符串长度
   */
  randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },
  /**
   * 判断移动端还是pc端
   * 
   */
  ismobile(ctx){
    let userAgent = this.request.header['user-agent'].toLowerCase();
    let pat_phone = /ipad|iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/;
    return pat_phone.test(userAgent);
}



}
