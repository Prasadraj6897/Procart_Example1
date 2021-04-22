import mongoose from "mongoose"
import Users from '../../Models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import {validationResult} from "express-validator"


export const adminsignIn = async (req, res)=>{
    const {email, password} = req.body
    // console.log(email, password)
    try{
        const existingUser = await Users.findOne({email})
        if(!existingUser){
            res.status(404).json({message : "Admin doesn't Exist"})
        }

        const isPasswordcorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordcorrect){
            res.status(400).json({message : "Password doesn't Match"})
        }

        if(existingUser.role != 'admin'){
            res.status(400).json({message : "You have no access"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result:existingUser, token})

    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const adminsignUp = async (req, res)=>{
        //, role, contactNumber, profilePicture

    const { firstName, lastName, email, password, ConfirmPassword} = req.body

    // console.log(firstName, lastName, email, password, ConfirmPassword)
    
    try{
        const existingUser = await Users.findOne({email})
        if(existingUser){
            res.status(400).json({message : "Admin already Exist"})
        }
        if(password != ConfirmPassword)
        {
            res.status(400).json({message : "Passwords Doesn't match"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await Users.create({ firstName, lastName, email, password: hashedPassword, ConfirmPassword, userName: Math.random().toString(), role:'admin'})

        // may remove await below

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token})
    }
    catch(error){
       
        return res.status(400).json({message:error.message})
    }
}

// export const requiresignin = async (req, res, next)=>{
//     // console.log(req.headers.authorization)
//     const token = req.headers.authorization.split(" ")[1];
//     const user = jwt.verify(token, 'test')
//     req.user = user
//     next();

// }
