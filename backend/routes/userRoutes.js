const express =require('express')
const router = express.Router()
const {registerUser,loginUser,getMe,findOneuser,editUser
} =require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.get('/getOneUser/:id',findOneuser)
router.post('/editUser/:id',editUser)

module.exports =router