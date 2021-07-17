const fs = require('fs');
/**
 * 自动读取加载routers文件夹中的路由，不用每个路由都写.routes()和.allowedMethods()
 * @module useRouter
 */
const useRouter = (app) => {
    //fs.readdirSync(__dirname)读取目录  forEac遍历
    fs.readdirSync(__dirname).forEach(file=>{
        if (file === 'index.js')  return

        const router = require(`./${file}`)

        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}

module.exports = useRouter