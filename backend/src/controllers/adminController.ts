import User from "../models/userModels";
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken";
import {Request,Response} from 'express'


//@desc     Auth admin / set token
//route     POST /api/admin/auth
//@access   Private

const adminLogin = asyncHandler(async(req:Request,res:Response) => {
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser && await existingUser.matchPassword(password)){
        if(existingUser.isAdmin){
            generateToken(res,existingUser.id,"admin");
            res.status(201).json({
                _id:existingUser._id,
                name:existingUser.name,
                email:existingUser.email,
            })
        }else{
            res.status(401);
            throw new Error('Unauthorised access')
        }
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})


//@desc     Get all registered users
//route     GET /api/admin/getUsers
//@access   Private
const getUsers = asyncHandler(async(req:Request,res:Response)=>{
    const users  = await User.find();
    if(users){
        res.status(200).json({users});
    }else{
        res.status(400);
        throw new Error('Error fetching user details');
    }
})

//@desc     Admin logout
//route     POST /api/admin/logout
//access    Private
const logoutAdmin  = asyncHandler(async(req:Request,res:Response) =>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({message:"Logout of admin successful"});
} )


//@desc     Get the details of a user by id
//route     GET /api/admin/getUserInfo:id
//access    Private
const getUserInfo = asyncHandler(async(req:Request,res:Response) =>{
    const userId = req.params.id;
    // console.log('user id:',userId);
    const userInfo = await User.findById(userId);
    // console.log('user info when user needed :',userInfo);
    // console.log('user found by admin is:',userInfo)
    res.status(200).json({userInfo});
})


//@desc     Update a users details
//@route    POST /api/admin/updateUserInfo
//access    Private
const updateUserInfo = asyncHandler(async(req:Request,res:Response)=>{
   
    const {id,name,email} = req.body;
    
    const updateUser = await User.findByIdAndUpdate({_id:id},{$set:{name,email}},{upsert:true});
    if(updateUser){
        res.status(200).json({message:'User updated'});
    }else{
        res.status(401);
        throw new Error('Error updating the user');
    }
})
 
//@desc     Delete a user by id
//route     POST /api/admin/deleteUser
//access    Private
const deleteUser = asyncHandler(async(req:Request,res:Response) =>{
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if(deleted){
        res.status(201).json({message:"User deleted successfully"});
    }else{
        res.status(401);
        throw new Error('No user with the id found')
    }
})

//@desc     create a new User
// route    POST /api/admin/createUser
//access    Private
const createUser = asyncHandler(async(req:Request,res:Response) =>{
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = new User({
        name,email,password,
    })
    await user.save();

    // console.log('user created is :',user)
    if(user){
        res.status(201).json({message:"New user created success",data:user})
    }else{
        res.status(400);
        throw new Error('Error while creating the user');
    }

})



export {
    adminLogin,
    getUsers,
    logoutAdmin,
    getUserInfo,
    updateUserInfo,
    deleteUser,
    createUser,
}