/**
	 * 路由自动化加载
	 * @param {string} dirPath
	 */
const routesHandler = require("../extend/routes")
const Koa = require("koa")
const app = require("../app")

class CustomKoa extends Koa {

/**
	 * 路由自动化加载
	 * @param {string} dirPath
	 */
 useRouters(dirPath) {
    const dirPathIsString = typeof dirPath === "string"

    if (!dirPathIsString) {
        throw new Error("路由目录dirPath为string类型必需参数")
    }
    this.use(routesHandler({ dirPath }))
}


}
let A = new CustomKoa()
module.exports = A