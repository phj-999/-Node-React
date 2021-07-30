
const fs =require('fs')
const path = require('path')

const handleuploadImg = (ctx,next)=>{
    
    const {username} = ctx.request.body
    const file = ctx.request.files.avatar
    // 创建可读流
    const readStream = fs.createReadStream(file.path)

    let filePath = path.join(__dirname,'public/images/')+`/${file.name}`
        // 创建可写流
    const writeStream = fs.createWriteStream(filePath)

    readStream.pipe(writeStream)

    
        
        await next()

        
}

module.exports = {handleuploadImg}