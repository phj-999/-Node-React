const Router = require('koa-router')
const glob = require('glob')
const compose = require('koa-compose')
const {resolve} = require ('path')

const routesHandler = (options = {})=>{
    const rootRouter = new Router()

    const { dirPath } = options

    const pattern  = resolve (dirPath,"**/*.js")
    
    const routes = glob
                .sync(pattern)
                .map(require)
                .filter(router => typeof router === 'function')
                .map(fn=>{
                    const router =new Router()
                    fn(router)
                    return router.routes()
                })

                rootRouter.use(...routes)

                return compose ([
                    rootRouter.routes(),
                    rootRouter.allowedMethods()
                ])
}

module.exports = routesHandler