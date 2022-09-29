const mongoose = require('mongoose')
const districtSchema = mongoose.Schema({
    district_name:{
        type:String,
        required:true
    }
   })
module.exports = mongoose.model('District',districtSchema)