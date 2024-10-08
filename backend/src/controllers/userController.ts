import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'
import User,{IUser} from '../models/userModels';
import generateToken from '../utils/generateToken';


//@desc     Auth user /set token
//route     POST /api/users/auth
//@access   Public

const authUser = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password}:{email:string,password:string}= req.body;
    const user = await User.findOne({email});
    if(user && await user.matchPassword(password)){
        generateToken(res,user.id,'user');
        res.status(201).json({data:{
            _id:user.id,
            name:user.name,
            email:user.email,
            profileImage:user.profileImage
        },message:"profile image can be added while editing the user profile"
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

//@desc     Register a new user
//route     POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req:Request,res:Response)=>{
    const {name,email,password}:{name:string,email:string,password:string} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user:IUser = await User.create({
        name,email,password
    })
    

    if(user){
        generateToken(res,user.id,'user');
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            profileImage:user.profileImage,
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})


//@desc     Logout user
//route     POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler(async(req:Request,res:Response)=>{
    res.cookie('jwt','',{httpOnly:true,expires:new Date(0)});
    res.status(200).json({message : 'User logged out'});
})


//@desc     Get user profile
//route     GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req:Request,res:Response)=>{
    const user = {
        _id:req.user?._id,
        name:req.user?.name,
        email:req.user?.email,
    }
    res.status(200).json(user);
})

//@desc     update user profile
//route     PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req:Request,res:Response)=>{
    const user = await User.findById(req.user?._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        // console.log('update profile worked',req)
        if(req.file){
            console.log('there is req.file :',req.file)
            user.profileImage = `/uploads/${req.file.filename}`;
        }

        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(201).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            profileImage:updatedUser.profileImage,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}