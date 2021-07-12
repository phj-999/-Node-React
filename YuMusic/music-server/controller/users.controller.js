//const UsersService = require('../service/users.service');
//const Users = require('../model/users')


// class UsersController {
//     async create(){
//         const {
//             user
//         } = ctx.request.body
//         //UsersService.reg(user)
// const result = await Users.create(user)
        
//      }
// }

const DB = require('../mongodb/db')

//注册用户

const addUser = async ctx => {
    
    const {username,password,age,sex} = ctx.request.body

    await DB.insert('users',{username,password,age,sex})

    let feedback
    
    try {
        feedback = {code:200,msg:'添加成功'}
    } catch (error) {
        console.log(error);
        feedback = {code:500,msg:'server error'}
    }
    
    ctx.body = feedback

    client.close()
}



module.exports = new UsersController()

