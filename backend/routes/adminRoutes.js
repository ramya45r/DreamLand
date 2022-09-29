const express =require('express')
const router = express.Router()
const {findOneuser,findUsers,deleteUser,editUser
} =require('../controllers/userController')
const {newHotel,getHotel,newDistrict,updatedDistrict,deleteDistrict, viewDistrict,viewAllDistrict,
    viewAllDistrictwiseHotel,newDistrictwisehotel,viewDistrictwiseHotel,deleteDistrictwisehotel,updatedDistrictwiseHotel,
    countByCity,countByType
     } = require('../controllers/admincontroller/adminController')
const {viewAllRooms,viewRoom,createRoom,updatedRoom,deleteRoom} =require('../controllers/admincontroller/RoomController')
const {protect} = require('../middleware/authMiddleware')

//----------------------User Management-----------------------------------------//

router.get('/',protect,findUsers)
router.get('/finduser/:id',protect,findOneuser)
router.delete('/deleteuser/:id',protect,deleteUser)
router.put('/edituser/:id',protect,editUser)

router.post('/hotel',protect,newHotel)
router.post('/hotel',protect,getHotel)
router.get('/hotel/countByCity',protect,countByCity)
router.get('/hotel/countByType',protect,countByType)
//---------------------------------District management---------------------------//
router.post('/district',newDistrict)
router.get('/district/:id',viewDistrict)
router.get('/district',viewAllDistrict)
router.put('/district/:id',updatedDistrict)
router.delete('/district/:id',deleteDistrict)

//---------------------------------Hotel management--------------------------------//
router.post('/districtwisehotel',newDistrictwisehotel)
router.get('/districtwisehotel',viewAllDistrictwiseHotel)
router.get('/districtwisehotel/:id',viewDistrictwiseHotel)
router.put('/districtwisehotel/:id',updatedDistrictwiseHotel)
router.delete('/districtwisehotel/:id',deleteDistrictwisehotel)
//--------------------------------- Rooms------------------------------------------//
router.get('/rooms',viewAllRooms)
router.get('/rooms/:id',viewRoom)
router.post('/rooms/:hotelid',createRoom)
router.put('/rooms/:id',updatedRoom)
router.delete('/rooms/:id',deleteRoom)

module.exports =router;