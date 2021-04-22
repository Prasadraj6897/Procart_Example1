

// for only signin user must enter into project

export const requiresignin = (req, res, next)=>{
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, 'test')
    req.user = user
    next();

}

//for user to see category
export const userMiddleware = (req, res, next)=>{



}  

// for admin to create Products
export const adminMiddleware = (req, res, next)=>{



}    