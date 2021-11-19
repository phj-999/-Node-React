/**
 * koa-log 打印日志进文件
 */

var fs = require('fs')
const path = require('path')

 // 获取文件Strema流
function createWriteStream(filename) {
    
    // 获取文件路径
    const fullFileName = path.join(__dirname, '../logs', filename)
    
    // 根据路径获取文件Strema流
    const writeStrema = fs.createWriteStream(fullFileName, {
       // 使用append方式向文件添加内容
        flags: 'a'  
    })
    return writeStrema
}

const accessWriteStrema = createWriteStream('access.log')

// 写入日志
function writeLog(writeStrema, log) {

     // 写入到文件中
    writeStrema.write(log + '\n') 
}

function access (log) {
    writeLog(accessWriteStrema, log)
}

module.exports = {
    access
}