import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModels'
import { NextFunction, Request, Response } from 'express'




const protect = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
 
    let token:string;
   
    token = req.cookies.jwt;
    // console.log('token at auth middle ware is :',token)
    if(token){
        try{
            if(!process.env.JWT_SECRET){
                throw new Error('value of JWT_SECRET not provided at .env file')
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            if(typeof decoded === 'object' && decoded !== null){
                req.user = await User.findById(decoded.userId).select('-password');
                console.log('req.user at authMidlleware :',req.user)
            }
            
            next()
        }catch(err){
            res.status(401);
            throw new Error('Not authorized, invalid token');
            // if(err instanceof Error){
            //     console.error('Error while verifying the token : ',err)
            // }else{
            //     console.error('Error while verifying the token :',String(err));
            // }
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export {protect}