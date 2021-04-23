import Product from '../../Models/Product.js'
import slugify from 'slugify'




export const createProduct = async (req, res)=>{
   
    const {name, price, description, category, createdBy, quantity} = req.body
    
    try{
        let productPictures = []
        if(req.files.length > 0){
            productPictures = req.files.map(file => {
                return {img : file.filename}
            })
        }
        const Productlist = {
            name: name,
            slug: slugify(name),
            price:price,
            quantity:quantity,
            description:description,
            productPictures:productPictures,
            category:category,
            createdBy:req.user.id

        }

       const result = await Product.create(Productlist)
       
       res.status(201).json({result})
    }
    catch(error){
       
       return res.status(500).json({message : error})
    }
}