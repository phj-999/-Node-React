'use strict';

const Service = require('egg').Service;
/**
 * redis 操作封装
 * @class RedisCacheService
 * @extends {Service}
 */
class RedisCacheService extends Service {
    /**
     * 设置redis缓存
     * @param { String } key 键
     * @param {String | Object | array} value 值
     * @param { Number } expir 过期时间 单位秒
     * @return { String } 返回成功字符串OK
     */
    async set(key,value,expir=0){
        const {redis} = this.app
        if (expir === 0 ) {
            return redis.set(key,JSON.stringify(value))
        }else{
            return await redis.set(key,JSON.stringify(value),'EX',expir)
        }
    }

    /**
     * 获取缓存
     *  @param { String } key 键
     *  @return { String | array | Object } 返回获取的数据
     */
    async get(key){
        const {redis} = this.app
        const result = await redis.get(key)
        return JSON.parse(result)
    }
}

module.exports = RedisCacheService