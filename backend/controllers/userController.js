const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
// @desc  Register new user
//@route  POST /api/users
//@access Public
const registerUser =asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    console.log( req.body);
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    //Check if user exists
    const userExists =await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password,salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }
   
})
// @desc  Authenticate user
//@route  POST /api/login
//@access Public
const loginUser =asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    //check for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid credientials')
    }
    
})
// @desc Get user Data
//@route  GET /api/users/me
//@access Private
const getMe =asyncHandler(async(req,res)=>{
   res.status(200).json(req.user)
   
})
//  Generate Jwt
const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

//find user 
const findUsers = asyncHandler(async (req, res) => {
    const user = await User.find({}).skip()
    res.json(user)  
});

const findOneuser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.json(user)
})

const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params
    const userDelete = await User.findByIdAndDelete(id)
    res.json({ id })
})

const editUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const editUser = await User.findByIdAndUpdate(id, req.body)
    res.json(editUser)
})




module.exports={
    registerUser,
    getMe,loginUser,
    findUsers,
    editUser,
    deleteUser,
    findOneuser
    
}