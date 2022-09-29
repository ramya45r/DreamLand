const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true,'Please add a name'],
       
    },
    email: {
        type:String,
        required:[true,'Please add an email'],
        unique:true
    },
    password: {
        type:String,
        required:[true,'Please add a password'], 
    },
    role:{
        type:String,
        enuum:["user","admin"],
        default:"user"
    }
},{
    timestamps:true
})
userSchema.pre("save",async function (next){
    if(this.email=='admin@gmail.com'){
        this.role="admin"
    }
    next();
})
 module.exports = mongoose.model('User',userSchema)