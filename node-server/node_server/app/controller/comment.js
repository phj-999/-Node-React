const Controller = require('egg').Controller;

class CommentController extends Controller {
  async add() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.add({
      userId: user.id,
      houseId: ctx.params('houseId'),
      msg: ctx.params('comment'),
      createTime: ctx.helper.time()
    });

    ctx.success(result);
  }

  async lists(){
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.lists(ctx.params(), user.id);

    ctx.success(result);
  }
}

module.exports = CommentController;