import Cart from '../../Models/Cart.js'
import Product from '../../Models/Product.js'
import slugify from 'slugify'


// import CreateCategories from '../CategoryList/CategoryList.js'

export const createCart = async (req, res)=>{
    // const {email, password} = req.body
    // console.log(req.body)
    try{
        
                    const UserAlreadyAddedProduct = await Cart.findOne({user: req.user.id})
                    if(UserAlreadyAddedProduct)
                    {
                        const isProduct = await Product.findById(req.body.cartItems.Product)
                        if(isProduct)
                            {
                                //quantity update
                                const isItemAdded = UserAlreadyAddedProduct.cartItems.find(c => c.Product == req.body.cartItems.Product)
                                // )
                                if(isItemAdded){
                                    // console.log(req.body.cartItems.quantity)
                                    const increaseCartItem = await Cart.findOneAndUpdate({"user": req.user.id, "cartItems.Product":req.body.cartItems.Product},
                                
                                        { 
                                            "$set":{
                                                "cartItems.$" :
                                                { 
                                                    ...req.body.cartItems,
                                                    quantity:isItemAdded.quantity + req.body.cartItems.quantity
                                                }
                                            }
                                        }
                                        
                                    )
                                        
                                    return res.status(200).json({increaseCartItem})
                                }
                                else{

                                    
                                        const increaseCartItem = await Cart.findOneAndUpdate({user: req.user.id},
                                
                                            { 
                                                "$push":{
                                                    "cartItems" : req.body.cartItems
                                                }
                                            }
                                            
                                        )
                                            
                                        return res.status(200).json({increaseCartItem})
                                                
                                    }
                            
                            }
                            else{
                                return res.status(500).json({message: "You are selected wrong product"})
                                
                            }
            
                    }
                else{
                    //add new cart
                    // console.log(req.body)
                    const isProduct = await Product.findById(req.body.cartItems.Product)
                    console.log(isProduct)

                        if(isProduct)
                        {
                            const cartItem = {
                                user: req.user.id,
                                cartItems: [
                                    req.body.cartItems
                                ]
                            }
                            const result = await Cart.create(cartItem)

                            return res.status(200).json({result})

                        }
                        else{
                            return res.status(500).json({message: "You are selected wrong product"})
                            
                        }

                }

       

       
    }
    catch(error){
       
       return res.status(500).json({message : error})
    }
}  

