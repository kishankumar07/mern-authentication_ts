import { Response } from 'express';
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';

const generateToken = (res:Response,userId:ObjectId) =>{

    if(!process.env.JWT_SECRET){
        throw new Error('No value of secret provided at env file')
    }

    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
    // console.log('this is the token at generate token :',token)
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken