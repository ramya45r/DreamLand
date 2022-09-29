const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Dreamland',{
    useNewUrlParser:true,
   
}).then(()=>{
    console.log(`db connected`.cyan.underline);
}).catch((e)=>{
    console.log('db not connected');
})