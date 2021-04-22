import jwt from 'jsonwebtoken'

// for only signin user must enter into project

export const requiresignin = (req, res, next)=>{
    // console.log(req.headers.authorization)
    if(req.headers.authorization)
    {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, 'test')
        req.user = user

    }
    else{
        return res.status(400).json({message:"Authorization Denied"})
    }
    
    next();
}

//for user to see category
export const userMiddleware = (req, res, next)=>{

    if(req.user.role !== 'admin')
    {
        return res.status(400).json({message:"User Access Denied"})
    }
    next();

}  

// for admin to create Products
export const adminMiddleware = (req, res, next)=>{
    
    if(req.user.role !== 'admin')
    {
        return res.status(400).json({message:"Admin Access Denied"})
    }
    next();

}    