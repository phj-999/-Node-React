const Service = require('egg').Service;
const BaseService = require('./base');

class CommentService extends BaseService { 
    //添加评论
    async add(params) {
        return this.run(async (ctx) => {
          const result = await ctx.model.Comment.create(params);
          return result;
        });
      }
    //评论列表
    async lists(params, userId){
        return this.run(async (ctx, app) => {
            const result = await ctx.model.Comment.findAll({
              where: {
                houseId: params.id,
                userId
              },
              limit: params.pageSize,
              offset: (params.pageNum - 1) * params.pageSize,
              include: [
                {
                  model: app.model.User,
                  attributes: ['avatar', 'username']
                }
              ]
            });
            return result;
          });
    }
 }