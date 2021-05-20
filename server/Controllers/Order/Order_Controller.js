import Order from '../../Models/Orders.js'
import Cart from '../../Models/Cart.js'

export const addOrder = (req, res) => {
    Cart.deleteOne({user:req.user.id}).exec((error,result)=>{
        if(error)
        {
            return res.status(400).json({error})
        }
        if(result){
            req.body.user = req.user.id
            const order = new Order(req.body)
            order.save((error, order)=>{
                if(error)
                {
                    return res.status(400).json({error})
                }
                if(order)
                {
                    return res.status(200).json({order})
                }
            })
        }
    })
        

}

export const getOrder = async (req, res) =>{
   await Order.find({user: req.user.id})
        .select("_id paymentStatus items")
        .populate("items.productId", "_id name productPictures")
        .exec((error, orders)=>{
            if(error)
            {
                return res.status(400).json({error})
            }
            if(orders)
            {
                return res.status(200).json({orders})
            }
        })
}