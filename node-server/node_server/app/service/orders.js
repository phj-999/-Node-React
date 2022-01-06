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
      //列表
      async lists(params){
        return this.run(async (ctx, app) => {
          const result = await ctx.model.Orders.findAll({
            where: {
              isPayed: params.type,
              userId: params.userId
            },
            limit: params.pageSize,
            offset: (params.pageNum -1) * params.pageSize,
            include: [
              {
                model: app.model.House,
                as: 'house',
                include: [
                  {
                    model: app.model.Imgs,
                    attributes: ['url'],
                    limit: 1
                  }
                ]
              }
            ]
          });
    
          return result;
        });
      }
    
      async pay(params){
        return this.run(async (ctx) => {
          const result = await ctx.model.Orders.update({
            isPayed: 1,
            orderNumber: params.orderNumber
          }, {
            where: {
              id: params.id
            }
          });
          return result;
        });
      }
}

module.exports = OrdersService;