'use strict';

const Controller = require('egg').Controller;

class GiftController extends Controller {
    //微信支付
    async wxpay() {
        const { ctx } = this;
        let user_id = ctx.authUser.id
        //参数验证
        ctx.validate({
            price: {
                type: 'int',
                required: true,
                desc: '充值测试'
            }
        })
        const { price } = ctx.query.body
        if (price < 1) {
            return ctx.apiFail('至少充值1元')
        }
        //充值订单
        let no = ctx.randomString(20)  //随机生成一个订单号
        let order = await this.app.model.Order.create({
            no,
            user_id,
            price
        })
        if (!order) {
            return ctx.apiFail('创建订单失败')
        }
        /**getAppParams获取APP支付参数(自动下单)
         */
        const result = await this.app.tenpay.getAppParams({
            out_trade_no: no,  //商户内部订单号
            body: '支付测试',
            total_fee: price * 100,  //订单金额(分)
            openid: 'APP'  //付款用户的openid
        })
        ctx.apiSuccess(result)
    }

    //支付回调
    async notify() {
        // 支付结果通知
        const { ctx, app, Service } = this
        let info = ctx.request.weixin

        if (!info || info.result_code !== 'SUCCESS') {
            return ctx.reply('支付失败');
        }

        let order = await app.model.Order.findOne({
            where: {
                no: info.out_trade_no
            }
        })

        if (!order) {
            return ctx.reply('订单不存在');
        }

        // 修改订单状态
        order.status = 'success'
        order.save()

        // 修改用户余额
        let user = await service.user.exist(order.user_id)
        if (user) {
            user.coin += parseInt(info.total_fee) / 100
            user.save()
        }
        // 回复消息(参数为空回复成功, 传值则为错误消息)
        ctx.reply();
    }
}

module.exports = GiftController;