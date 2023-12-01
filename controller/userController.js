import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/userModels.js";
import sendToken from "../utils/jwtToken.js";

// Registering as a new user
export const registerUser = catchAsyncError( async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id : "This is just sample",
        url:"url"
      },
    });
    sendToken(user,201,res)
  }
);

// login user with provide email and password
export const loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    sendToken(user,200,res)
})

// Logouting the user 
export const logoutUser = catchAsyncError(async(req,res,next)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({success:true,message:"LogOut successfully"})
})

// getting user details
export const getUserDetails = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success:true,
    user
  })  
})

// updating user Profile
export const updateProfile = catchAsyncError(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email:req.body.email
  }

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
  })
  res.status(200).json({success:true,})
})

// get all user --admin
export const getAllUsers = catchAsyncError(async(req,res,next)=>{
  const users = await User.find()
  res.status(200).json({success:true,users})
})

// get a single user -- Admin
export const getAUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    return next(new ErrorHandler(`user doesnot exist with given id ${req.params.id}`))
  }
  res.status(200).json({
    success:true,
    user
  })
})

// updating user Role --admin
export const updateRole = catchAsyncError(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
  })
  if(!user){
    return next(new ErrorHandler(`user doesnot exist with given id ${req.params.id}`))
  }
  res.status(200).json({success:true,})
})

// deleting user --admin
export const deleteUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    return next(new ErrorHandler(`user doesnot exist with given id ${req.params.id}`))
  }

  await user.deleteOne()
  res.status(200).json({success:true,})
})