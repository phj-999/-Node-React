'use strict';
const md5 = require('md5');

const Controller = require('egg').Controller;

class LiveController extends Controller {
    async save() {
       let { ctx, app } = this
       let user_id = ctx.authUser.id
       //参数验证
       ctx.validate({
           title:{
               required:true,
               type:"string",
               desc: '直播间标题'
           },
           cover:{
               required:false,
               type:"string",
               desc: '直播间封面'
            }
       })
       let { title,cover } = ctx.request.body
       let key = ctx.randomString(20)
       //创建
       let res = await app.model.Live.create({
        title,
        cover,
        user_id,
        key,
    })
    
    // 生成签名
     // 生成签名
     let sign = this.sign(key)

     ctx.apiSuccess({
         data: res,
         sign
     });

  }
   // 生成签名
   sign(key) {
    let { ctx, app } = this;
    //拿到加密的字符串
    const secret = app.config.mediaServer.auth.secret
    //自定义过期时间
    const expire = parseInt((Date.now() + 100000000) / 1000);
    //生成加密字符串  md5进行加密 key 房间号 
    const hashValue = md5(`/live/${key}-${expire}-${secret}`);
    return `${expire}-${hashValue}`
}
// 修改直播间状态
async changestatus() {
    let { ctx, app } = this;
    let user_id = ctx.authUser.id;
    // 参数验证
    ctx.validate({
        id: {
            type: 'int',
            required: true,
            desc: '直播间ID'
        },
        type: {
            type: 'string',
            required: true,
            range: {
                in: ['play', 'pause', 'stop']
            }
        }
    })
    let { id, type } = ctx.request.body

    let live = await app.model.Live.findOne({
        where: {
            id,
            user_id
        }
    });

    if (!live) {
        return ctx.apiFail('该直播间不存在');
    }

    if (live.status === 3) {
        return ctx.apiFail('该直播间已结束');
    }

    const status = {
        play: 1,
        pause: 2,
        stop: 3
    }

    live.status = status[type]
    await live.save()

    return ctx.apiSuccess('ok')
}

 // 直播间列表
 async list() {
    let { ctx, app } = this;
    ctx.validate({
        page: {
            required: true,
            desc: "页码",
            type: "int"
        }
    });
    let page = ctx.params.page
    let limit = 10
    let offset = (page - 1)*limit
    let rows = await app.model.Live.findAll({
        limit,offset
    })
    ctx.apiSuccess(rows);
}
//查看指定直播间
async read(){
    const { ctx, app} = this
    //参数验证
    ctx.validate({
        id:{
            required:true,
            desc:'直播间ID',
            type:'int'
        }

    })
    const id = ctx.params.id
    let live = await app.model.Live.findOne({
        where:{id},
        include:[{
            model:app.model.User,
            attributes:['id','username','avatar']
        }]
    })
    if (!live) {
        return ctx.apiFail('当前直播间不存在')
    }
     //生成签名
    let sign = null
    //直播未结束
    if (live.status !== 3) {
        sign = this.sign(live.key)
    }
   

    ctx.apiSuccess({
        data: live,
            sign
    })
}































}

module.exports = LiveController;
