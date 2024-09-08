import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'
import User from '../models/userModels';

//@desc     Auth user /set token
//route     POST /api/users/auth
//@access   Public

const authUser = asyncHandler(async(req:Request,res:Response)=>{
    res.status(200).json({message:'auth token worked'});;
})

//@desc     Register a new user
//route     POST /api/users
//@access   Public
const registerUser = asyncHandler(async(req:Request,res:Response)=>{
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,email,password
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email
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
    res.status(200).json({message:'Logout user'});
})


//@desc     Get user profile
//route     GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req:Request,res:Response)=>{
    res.status(200).json({message:'User profile'});
})

//@desc     update user profile
//route     PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async(req:Request,res:Response)=>{
    res.status(200).json({message:'update User profile'});
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}