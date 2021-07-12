//非对称加密 公钥和私钥配置
const fs = require('fs')
const path = require('path');

const PRIVATE_KEY = fs.readFileSync(path.resolve__dirname, './keys/private.key')
const PUBLIC_KEY = fs.readFileSync(path.resolve__dirname,'./keys/public.key')

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY