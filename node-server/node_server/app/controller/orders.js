const Controller = require('egg').Controller;
//const BaseController = require('./base');

class OrdersController extends Controller {
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
      //列表
      async lists() {
        const { ctx, app } = this;
        console.log('order lists', ctx.userId)
        const result = await ctx.service.orders.lists({
          ...ctx.params(),
          userId: ctx.userId
        });
        console.log('order lists', result)
        ctx.success(result);
      }

      async invokePay(params) {
        return {
          orderNumber: params.id + new Date().getTime()
        }
      }
    
      async pay() {
        const { ctx, app } = this;
        const { id } = ctx.params();
        const order = await ctx.model.Orders.findByPk(id);
    
        if (order) {
          try {
            const beforePay = await this.invokePay({ id });
            const result = await ctx.service.orders.pay({
              id,
              orderNumber: beforePay.orderNumber
            });
            this.success(result);
          } catch (error) {
            this.error('订单支付失败');
          }
        } else {
          this.error('订单不存在');
        }
      }
 }
 module.exports = OrdersController;