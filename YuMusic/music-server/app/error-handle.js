const errTypes = require('../config/error-types');

const errorhandle = (error, ctx) => {

    let status, message;

    switch (error.message) {
       
        case errTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            
        status=400
        
        break;

         //用户名已存在
         case errorTypes.USER_DOES_NOT_EXISTS:
             status = 409 // conflict 冲突
             message = '用户名已存在'
          break;
    
        default:
            status = 404

            message = 'NOT FOUND'
            
            break;
    }

    ctx.status = status

    ctx.body = message
}

module.exports = errorhandle