/**
 * 上传图像
 */
 const Router = require('koa-Router')
 const imgRouter = new Router();
 
 const UploadImgController = require('../controller/users/img.controller')
 
 
 imgRouter.post('/api/img',UploadImgController.uploadImg)
 
 module.exports = imgRouter