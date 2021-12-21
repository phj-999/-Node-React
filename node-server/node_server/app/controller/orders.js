const Controller = require('egg').Controller;
const BaseController = require('./base');

class OrdersController extends BaseController {
    //查询订单
    async hasOrder() {
        const { ctx, app } = this;
        const result = await ctx.service.orders.hasOrder({
          userId: ctx.userId,
          houseId: ctx.params('id')
        });
    
        ctx.success(result);
      }
      //添加订单（预定）
      async addOrder() {
        const { ctx, app } = this;
        const result = await ctx.service.orders.addOrder({
          userId: ctx.userId,
          houseId: ctx.params('id'),
          isPayed: 0,
          createTime: ctx.helper.time()
        });
    
        ctx.success(result);
      }

      //删除订单
      async delOrder() {
        const { ctx, app } = this;
        const result = await ctx.service.orders.delOrder(ctx.params('id'));
    
        ctx.success(result);
      }
 }
 module.exports = OrdersController;