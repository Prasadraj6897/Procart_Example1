import Order from '../../Models/Orders.js'


export const addOrder = (req, res) => {
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

export const getOrder = (req, res) =>{
    Order.find({user: req.user.id})
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