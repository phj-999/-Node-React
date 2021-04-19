'use strict';

const Controller = require('egg').Controller;

class GiftController extends Controller {
    // 创建表单
    async create(){
        const { ctx } = this;
        await ctx.renderTemplate({
            // 页面标题
            title: "创建礼物",
            // 模板类型 form表单，table表格分页
            tempType: "form",
            // 表单配置
            form: {
                // 提交地址
                action: "/admin/gift",
                // 字段配置
                fields:[{
                    label: "礼物名称",
                    type: "text",
                    name: "name",
                    placeholder: "礼物名称"
                }, {
                    label: "礼物图标",
                    type: "file",
                    name: "image",
                    placeholder: "礼物图标"
                },{
                    label: "金币",
                    type: "number",
                    name: "coin",
                    placeholder: "金币"
                }]
            },
            // 新增成功跳转路径
            successUrl:"/admin/gift"
        });
    }

    // 创建逻辑
    async save(){
        const { ctx,app } = this;

        ctx.validate({
            name:{
                type:"string",
                required:true,
                desc:"礼物名称"
            },
            image:{
                type:"string",
                required:false,
                desc:"礼物图标"
            },
            coin:{
                type:"int",
                required:true,
                defValue:0,
                desc:"金币"
            },
        })

        let { name,image,coin } = ctx.request.body;

        let res = await app.model.Gift.create({
            name,image,coin
        })

        ctx.apiSuccess(res)
    }
}

module.exports = GiftController;
