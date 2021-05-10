import jwt from 'jsonwebtoken'

import multer from 'multer'
import shortid from 'shortid'
import * as path from 'path';

const __dirname = path.resolve();

//below is for destination for uploading files 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), '/server/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({storage})
 
export default upload;

// for only signin user must enter into project

export const requiresignin = (req, res, next)=>{
    // console.log("req.headers.authorization",req.headers)
    if(req.headers.authorization)
    {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, 'test')
        req.user = user

    }
    else{
        return res.status(500).json({message:"Authorization Denied"})
    }
    
    next();
}

//for user to see category
export const userMiddleware = (req, res, next)=>{

    if(req.user.role !== 'user')
    {
        return res.status(500).json({message:"User Access Denied"})
    }
    next();

}  

// for admin to create Products
export const adminMiddleware = (req, res, next)=>{
    
    if(req.user.role !== 'admin')
    {
        return res.status(500).json({message:"Admin Access Denied"})
    }
    next();

}    