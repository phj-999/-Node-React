// const Users = require('../model/users')

// class UsersService {

//    async reg(user){        
//         const result =await Users.create(user)
//         ctx.apiSuccess(user)
//         // .then(rel=>{
//         //     if(rel){
//         //         ctx.body = {
//         //             code: 200,
//         //             msg: '注册成功'
//         //         }
//         //     }else{
//         //         ctx.body = {
//         //             code: 300,
//         //             msg: '注册失败'
//         //         }
//         //     }
//         // }).catch(err=>{
//         //     ctx.body = {
//         //         code: 500,
//         //         msg: '注册时出现异常',
//         //         err
//         //     }
//         // })   
//         return result
//     }
// }
// module.exports = new UsersService()