import Product from '../../Models/Product.js'
import slugify from 'slugify'
import Category from '../../Models/Category.js'



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
       
       return res.status(200).json({result})
    }
    catch(error){
       
       return res.status(500).json({message : error})
    }
}

export const getProductsBySlug =  async (req, res)=>{
   
    const {slug} = req.params
    // console.log(req.params)
    
    try{
        Category.findOne({slug:slug})
        .select('_id type')
        .exec((error, category) => {
            if(error)
            {
                return res.status(500).json({message : error})
            }
            
            if(category)
            {
                Product.find({category: category._id})
                .exec((error, products) => {
                if(error)
                {
                    return res.status(500).json({message : error})
                }
                if(category.type)
                {
                    if(products.length > 0)
                    {
                        return res.status(200).json({products,
                            priceRange: {
                                under5k: 5000,
                                under10k: 10000,
                                under15k: 15000,
                                under20k: 20000,
                                under25k: 25000,
                                under30k: 30000,
                                above50k: 50000,
                                above100k: 100000,
                              },
                            ProductPrice: {
                                under5k: products.filter(product=> product.price <= 5000),
                                under10k: products.filter(product=> product.price > 5000 && product.price <= 10000),
                                under15k: products.filter(product=> product.price > 10000 && product.price <= 15000),
                                under20k: products.filter(product=> product.price > 15000 && product.price <= 20000),
                                under25k: products.filter(product=> product.price > 20000 && product.price <= 25000),
                                under30k: products.filter(product=> product.price > 25000 && product.price <= 30000),
                                above50k: products.filter(product=> product.price > 50000 && product.price <= 100000),
                                above100k: products.filter(product=> product.price >= 100000),
                            
                            }
                        
                        
                        })
                    }
                }
                else{
                    return res.status(200).json({products})
                }
                
               
                

                })
            }
        })
        
        
    }
    catch(error){

    }
}

export const getProductDetailsBySlug =  async (req, res)=>{
   
    const {ProductId} = req.params
    // console.log(req)
    
    try{
        if(ProductId)
        {
            Product.findOne({_id:ProductId})
            .exec((error, product)=>{
                if(error)
                {
                    return res.status(400).json({message : error})
                }
                if(product)
                {
                    return res.status(200).json({product})
                }
            })
        }
    }
    catch(error){
        return res.status(400).json({message : error})
    }
}

export const deleteProductById =  async (req, res)=>{
    // console.log(req.body.payload)
    const productId = req.body.payload.productId
    // console.log(req)
    
    try{
        if(productId)
        {
           Product.deleteOne({_id:productId})
            .exec((error, result)=>{
                if(error)
                {
                    return res.status(400).json({message : error})
                }
                if(result)
                {
                    return res.status(200).json({result})
                }
            })
        }
    }
    catch(error){
        return res.status(400).json({message : error})
    }
}

export const getALLProducts =  async (req, res)=>{
    // console.log("products")
    try{
            
            const products = await Product.find({})
                                .select('_id name price quantity slug description productPictures category')
                                .populate({path: 'category', select:'_id name'})
                                .exec()
        // console.log(products)
        return res.status(200).json({products})
    }
    catch(error){
        return res.status(400).json({message : error})
    }
}