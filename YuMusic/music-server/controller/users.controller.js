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
    
    const {username,password,age,sex,telephone,email} = ctx.request.body

    let create_data = 

    await DB.insert('users',{username,password,age,sex,telephone,email})

    let feedback
    
    try {
       feedback={
           code:200,
           msg:'注册成功',
           data:{
            username
           }
       }
    } catch (error) {
        console.log(error);
        feedback = {code:500,msg:'server error'}
    }
    
    ctx.body = feedback

}

const users = {addUser}

module.exports = {users}

