'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
    // 列表页
    async index() {
        this.ctx.body = '列表页';
    }
    // 新增表单页
    async new() {
        this.ctx.body = '新增表单页';
    }
    // 新增逻辑
    async create() {
        this.ctx.body = '新增逻辑';
    }
    // 详情页
    async show() {
        this.ctx.body = '详情页' + this.ctx.params.id;
    }
    // 编辑表单页
    async edit() {
        this.ctx.body = '编辑表单页';
    }
    // 更新逻辑
    async update() {
        this.ctx.body = '更新逻辑';
    }
    // 删除逻辑
    async destroy() {
        this.ctx.body = '删除逻辑';
    }
}

module.exports = PostController;
