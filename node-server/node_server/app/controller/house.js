const Controller = require("egg").Controller;

class HouseController extends Controller {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    ctx.success(result);
  }

  async search() {
    const { ctx, app } = this;
    const result = await ctx.service.house.search(ctx.params());
    ctx.success(result);
  }

  async detail() {
    const { ctx, app } = this;
    const result = await ctx.service.house.detail(ctx.params("id"));

    ctx.success({
      info: result,
      banner: result.imgs,
    });
  }
}

module.exports = HouseController;
