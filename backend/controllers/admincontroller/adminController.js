const asyncHandler =require('express-async-handler')
const Hotel = require('../../model/Hotel')
const Districtwisehotel =require('../../model/districtwiseHotel')
const District =require('../../model/District')
const Room = require('../../model/Room')
const { NextWeek } = require('@material-ui/icons')

const newHotel =asyncHandler(async(req,res)=>{
  console.log(req.body);
const newOne =new Hotel(req.body)
  try{
    const savedHotel = await newOne.save()
    res.status(200).json(savedHotel)
  }catch(err){
    res.status(500).json(err)
  }
})
const getHotel =asyncHandler(async(req,res)=>{
        
  try{ 
      const gethotel = await Hotel.find();
      res.status(200).json(gethotel)
    }catch(err){
      res.status(500).json(err)
    }
  })

  const countByCity =asyncHandler(async(req,res)=>{
       const cities =req.query.cities.split(",")
    try{ 
        const list =await Promise.all(cities.map(city=>{
          return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
      }catch(err){
        res.status(500).json(err)
      }
    })


    const countByType =asyncHandler(async(req,res)=>{
      try{ 
       const hotelCount = await Hotel.countDocuments({type:'hotel'});
       const apartmentCount = await Hotel.countDocuments({type:"hotel"});
       const resortCount = await Hotel.countDocuments({type:'resort'});
       const villaCount =await Hotel.countDocuments({type:'vila'});
       const cabinCount =await Hotel.countDocuments({type:'cabin'});
      res.status(200).json([
        {type:'hotel',count:hotelCount},
        {type:'apartment',count:apartmentCount},
        {type:'resorts',count:resortCount},
        {type:'villa',count:villaCount},
        {type:'cabins',count:cabinCount},
      ]);
      }catch(err){
       next(err);
      }
    })
//----------------------------------------Add new district---------------------------------------------//

const newDistrict =asyncHandler(async(req,res)=>{
  console.log(req.body)
  
  const newdistrict =new District(req.body)
      try{
        const savedDistrict = await newdistrict.save()
        res.status(200).json(savedDistrict)
      }catch(err){
        res.status(500).json(err)
      }
    })
//-------------------------------------------------------------
    const viewDistrict =asyncHandler(async(req,res)=>{
        
        try{ 
            const viewdistrict = await District.findById(req.params.id);
            res.status(200).json(viewdistrict)
          }catch(err){
            res.status(500).json(err)
          }
        })
//----------------------------------------------------------
        const viewAllDistrict =asyncHandler(async(req,res)=>{
        
          try{ 
              const viewalldistrict = await District.find();
              res.status(200).json(viewalldistrict)
            }catch(err){
              res.status(500).json(err)
            }
          })

//----------------------------------------Update new district---------------------------------------------//
    const updatedDistrict =asyncHandler(async(req,res)=>{
        try{
          const updatedDistrict = await District.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
          res.status(200).json(updatedDistrict)
        }catch(err){              
          res.status(500).json(err)
        } 
      }) 
//----------------------------------------Delete new district---------------------------------------------//
const deleteDistrict =asyncHandler(async(req,res)=>{
    try{
      await District.findByIdAndDelete(req.params.id)
      res.status(200).json("District has been deleted")
    }catch(err){
      res.status(500).json(err)
    }
  })


//----------------------------------------Add hotelname------------------------------------------------------------//
const newDistrictwisehotel =asyncHandler(async(req,res)=>{ 
  console.log(req.body)
  const newdistrictwisehotel =new Districtwisehotel(req.body)
      try{
        const savedDistrictwisehotel = await newdistrictwisehotel.save()
        res.status(200).json(savedDistrictwisehotel)
      }catch(err){
        res.status(500).json(err)
      }   
    })      
//-------------------------------------------------------------------------------------
const newDistrictwisehotel1=async(req,res)=>{

  try{

  }catch(err){
    
  }
}
 
  


//------------------------------------------------------------------------------
    const  viewDistrictwiseHotel =asyncHandler(async(req,res)=>{
     
      try{ 
          const viewdistrictwisehotel = await Districtwisehotel.findById(req.params.id);
          res.status(200).json(viewdistrictwisehotel)
        }catch(err){
          res.status(500).json(err)
        }
      })

      const viewAllDistrictwiseHotel =asyncHandler(async(req,res)=>{
     
        try{ 
            const viewalldistrictwisehotel = await Districtwisehotel.find();
            res.status(200).json(viewalldistrictwisehotel)
          }catch(err){
            res.status(500).json(err)
          }
        })
///----------------------------------------Update new district---------------------------------------------//
const updatedDistrictwiseHotel =asyncHandler(async(req,res)=>{
  try{
    const updateddistrictwisehotel = await Districtwisehotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updateddistrictwisehotel)
  }catch(err){              
    res.status(500).json(err)
  } 
}) 
//----------------------------------------Delete new district---------------------------------------------//
const deleteDistrictwisehotel =asyncHandler(async(req,res)=>{
try{
await Districtwisehotel.findByIdAndDelete(req.params.id)
res.status(200).json("hotel has been deleted")
}catch(err){
res.status(500).json(err)
}
})


module.exports={
    newHotel,newDistrict,updatedDistrict,deleteDistrict,viewDistrict,viewAllDistrict,
    newDistrictwisehotel,viewDistrictwiseHotel,viewAllDistrictwiseHotel,updatedDistrictwiseHotel,deleteDistrictwisehotel,
    getHotel,
    countByCity,countByType,
}
 