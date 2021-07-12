
const controller = require('../controller/users.controller')

// const {
//     verifyusers, 
// } = require ('../middlewares/users.middleware.js')


module.exports = router => {
router.post('/api/users', controller.create)
}
