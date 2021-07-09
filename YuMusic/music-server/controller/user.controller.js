const service = require('../service/user.service');

class UserController {
     create(){
         const user = ctx.request.body
         const result=  service.create(user)
         ctx.body = result
     }
}
module.exports = new UserController()

