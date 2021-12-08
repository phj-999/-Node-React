'use strict';

const Service = require("egg").Service;

class UserService extends Service {
    async getUser(username) {
     try {
        const {ctx,app}=this
        const result = await ctx.model.User.findOne({
            where: {username}
        })
        return result
     } catch (error) {
         console.log(error);
         return null
     }
    }

    async add(params){
        try {
            const {ctx} = this
            const result  = await ctx.model.User.create(params)
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }

    //修改
    async edit(params) {
        try {
            const result = await ctx.model.User.update(params, {
                where: {
                    username: ctx.username
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return null
        }
    }
}


module.exports = UserService;