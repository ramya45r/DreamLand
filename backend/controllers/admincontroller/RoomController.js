const asyncHandler =require('express-async-handler');
const Hotel = require('../../model/Hotel');
const Room = require('../../model/Room')
//---------------------Room-------------------------//
 const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
  
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedRoom);
    } catch (err) {
      next(err);
    }
  };
    //------------------------------------------------------//
    const updatedRoom =asyncHandler(async(req,res)=>{
      try{
        const updatedroom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedroom )
      }catch(err){              
        res.status(500).json(err)
      } 
    }) 
    //---------------------------------------------------------------------//
    const deleteRoom =asyncHandler(async(req,res)=>{
      const hotelId = req.params.hotelid;
     try{
      await Room.findByIdAndDelete(req.params.id)
     try{
        await Hotel.findByIdAndUpdate(hotelId,{
            $pull:{rooms:req.params.id}
        });
     }catch(err){
        next(err);
     }
     res.status(200).json("Room has been deleted")
      }catch(err){
      next(err)
      }
      })
      //--------------------VIEW ROOM------------------------------------//
      const viewRoom =asyncHandler(async(req,res)=>{
       
        try{ 
            const viewroom = await Room.findById(req.params.id);
            res.status(200).json(viewroom)
          }catch(err){
            res.status(500).json(err)
          }
        })
  //--------------------VIEW ROOM------------------------------------//
        const viewAllRooms =asyncHandler(async(req,res)=>{
       
          try{ 
              const viewallrooms = await Room.find();
              res.status(200).json(viewallrooms)
            }catch(err){
              res.status(500).json(err)
            }
          })
          module.exports={
            createRoom,updatedRoom,deleteRoom,viewRoom,viewAllRooms
          }