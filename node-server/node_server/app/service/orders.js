const Service = require('egg').Service;
const BaseService = require('./base');

class OrdersService extends BaseService {
    //查询订单
    async hasOrder(params) {
        return this.run(async (ctx) => {
          const result = await ctx.model.Orders.findOne({
            where: {
              userId: params.userId,
              houseId: params.houseId
            }
          });
          return result;
        });
      }

      //预定
      async addOrder(params){
        return this.run(async (ctx) => {
          const result = await ctx.model.Orders.create(params);
          return result;
        });
      }
      //删除
      async delOrder(id){
        return this.run(async (ctx) => {
          const result = await ctx.model.Orders.destroy({
            where: { id }
          });
          return result;
        });
      }
      
}

module.exports = OrdersService;