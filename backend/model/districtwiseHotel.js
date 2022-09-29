const mongoose = require('mongoose')
const districtwiseHotelSchema = mongoose.Schema({
    District_id:{
        type:String,
        required:true
    },
    hotel_name:{
        type:String,
        required:true
    }

   })
module.exports = mongoose.model('Districtwisehotel',districtwiseHotelSchema)