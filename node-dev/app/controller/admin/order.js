'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    async index() {
        const {
            ctx,
            app
        } = this
        let list = await ctx.page('Order', {}, {
            //关联
            include: [{
                model: app.model.User,
                attributes: ['id', 'username', 'avatar']
            }]
        })
        list = JSON.parse(JSON.stringify(list))

        await ctx.renderTemplate({
            title: "订单列表",
            tempType: "table",
            table: {
                // 表头
                columns: [{
                    title: "ID",
                    fixed: 'center',
                    key: "id"
                }, {
                    title: "订单号",
                    fixed: 'center',
                    key: "no"
                }, {
                    title: "用户",
                    fixed: 'left',
                    render(item) {
                        let image = item.user.avatar ? item.user.avatar : '/public/assets/img/profiles/avatar-03.jpg'
                        return `
                    <h2 class="table-avatar">
                        <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="${image}"></a>
                        <a href="profile.html">${item.user.username}</a>
                    </h2>
                    `
                    }
                }, {
                    title: "价格",
                    fixed: 'center',
                    key: "price"
                }, {
                    title: "订单状态",
                    fixed: 'center',
                    render(item) {
                        const o = {
                            pending: {
                                text: "未支付",
                                color: "warning"
                            },
                            success: {
                                text: "支付成功",
                                color: "success"
                            },
                            fail: {
                                text: "支付失败",
                                color: "danger"
                            }
                        }
                        let v = o[item.status]
                        return `
                    <span class="badge badge-${v.color}">${v.text}</span>
                    `
                    }
                }, {
                    title: "创建时间",
                    fixed: 'center',
                    width: 180,
                    key: "created_time"
                }, {
                    title: "操作",
                    width: 200,
                    fixed: 'center',
                    action: {
                        delete: function(id) {
                            return `/admin/order/delete/${id}`
                        },
                    }
                }]
            },
            list
        })
    }
    //删除管理员
    async delete() {
        const {
            ctx,
            app
        } = this;
        const id = ctx.params.id; // 拿到传过来的参数id
        await app.model.Order.destroy({
            where: {
                id,
            },
        });
        ctx.toast('删除成功', 'success');
        ctx.redirect('/admin/order');
    }

}

module.exports = OrderController;