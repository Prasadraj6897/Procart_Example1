import Category from '../../Models/Category.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import slugify from 'slugify'

export const createCategory = async (req, res)=>{
    // const {email, password} = req.body
    // console.log(req.body.name)
    try{
       const categoryObj = {
           name: req.body.name,
           slug: slugify(req.body.name)
       }

       if(req.body.parentId)
       {
        categoryObj.parentId = req.body.parentId
       }

       const result = await Category.create(categoryObj)
       
       res.status(200).json({result})
    }
    catch(error){
       
       return res.status(500).json({message : error})
    }
}

export const getCategory = async (req, res)=>{
    try{
        const result = await Category.find({})
        
        res.status(200).json({result})
     }
     catch(error){
        
        return res.status(500).json({message : error})
     }


}