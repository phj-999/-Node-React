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
        const {ctx} = this
        
        try {
            await ctx.model.User.update(params, {
                where: {
                    id: ctx.authUser.id
                }
            });
            return
        } catch (error) {
            console.log(error);
            return null
        }
    }
}


module.exports = UserService;