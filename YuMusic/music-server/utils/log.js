var fs = require('fs')
const path = require('path')

 // 获取文件Strema流
function createWriteStream(filename) {
    // 获取文件路径
    const fullFileName = path.join(__dirname, '../logs', filename)
    
    // 根据路径获取文件Strema流
    const writeStrema = fs.createWriteStream(fullFileName, {
        flags: 'a'  // 使用append方式向文件添加内容
    })
    return writeStrema
}

const accessWriteStrema = createWriteStream('access.log')

// 写入日志
function writeLog(writeStrema, log) {
    writeStrema.write(log + '\n')  // 写入到文件中
}

function access (log) {
    writeLog(accessWriteStrema, log)
}

module.exports = {
    access
}