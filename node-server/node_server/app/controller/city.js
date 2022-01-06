const Controller = require("egg").Controller;

class CityController extends Controller {
  async citys() {
    const { ctx, app } = this;
    try {
      const result = await app.httpclient.request(
        "https://apis.imooc.com/?icode=B2060B086C0D78F9",
        {
          dataType: "json",
        }
      );
      // console.log(result)
      if (result.status === 200) {
        ctx.success(result.data.citys);
      } else {
        ctx.error("获取城市数据失败");
      }
    } catch (error) {
      ctx.error("获取城市数据失败");
    }
  }
}
module.exports =  CityController