/**
 * 上传图像
 */
// const fs =require('fs')
// const path = require('path')

// class UploadImgController {
//     async uploadImg (ctx,next){
//         const file = ctx.request.files.avatar

     
      
//          return ctx.body = {
//             code: 200,
//             data: {
//              url: 'http://' + ctx.headers.host + '/upload/' + newFilename
//             }
//            };
       
    
// }}

// module.exports = new UploadImgController()

/* 
    文件上传 
 */
    const fs = require('fs');
    const path = require('path');
    const dateFormat = require('../utils/dateFormat.js')
    const upload= {
            UPLOAD: '/public',
            IMAGE: '/images/',
            FILE: '/users/',
            MAXFILESIZE: 200 * 1024 * 1024, //上传文件大小
        }
    // 创建文件目录
    // const mkdirFile = (path) => {
    //     let pathList = path.split('/');
    //     let fileDir = ''
    //     pathList.forEach(i => {
    //         if(i) {
    //             fileDir += ('/' + i)
    //             if(!fs.existsSync(fileDir)) {
    //                 fs.mkdirSync(fileDir, err => {
    //                     LogFile.info('创建失败', err)
    //                     return
    //                 });
    //             }
    //         }
    //     })
    // }
    //保存文件
    const saveFile = (file, path) => {
        return new Promise((resolve, reject) => {
            let render = fs.createReadStream(file);
            // 创建写入流
            let upStream = fs.createWriteStream(path);
            render.pipe(upStream);
            upStream.on('finish', () => {
                resolve(path)
            });
            upStream.on('error', (err) => {
                reject(err)
            });
        })
    }
    
    /**
     * 文件上传
     * ps 生成文件名为 SKD_日期
     *     文件路径根据年月分存放
     */
    const uploadImg = async ctx => {
        var time = Date.parse(new Date())
        let date = dateFormat.dateFormat(time, 'yyyyMMddhhmmss');
        let file = ctx.request.files.avatar;
        let fileName = 'SKD_ '+ upload.UPLOAD + upload.IMAGE //上传保存目录
        let fileYear = date.substring(4, 8) + '/' +
            date.substring(8, 10);
        let tail = file.name == 'blob' ? 'png' : file.name.split('.').pop()
        let filePath = path.join(fileName, fileYear, date + '.' + tail); //根据时间拼接好文件名称
        await mkdirFile(fileName + fileYear)         //创建文件目录
        await saveFile(file.path, filePath).then(su => {
            let uplaod_img = su.substring(upload.UPLOAD.length, su.length)
            ctx.body = {
                error_code: 10000,
                error_message: '上传文件成功',
                realName: uplaod_img,
            }
        }).catch(err => {
            ctx.body = {
                error_code: 20008,
                error_message: '上传文件失败！',
            }
        })
    }
    
    module.exports = {
        uploadImg
    };