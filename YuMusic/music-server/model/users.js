const mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
    username: {
        type:String
    },
    password:{
        type: String,
       
    },
    repassword:{
        type:String,
    },
    avatar:{
        type:String,
        default:''
    },
    sex:{
        type:String,
        default:'男'
    },
    phone:{
        type:Number,
        default:''
    },
    email: {
        type:String,
        default:''
    },
    create_time: {
        type: String,
        default: Date.now
      }
})

let Users = mongoose.model('users',UsersSchema)

module.exports = Users