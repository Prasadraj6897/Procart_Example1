import Order from '../../Models/Orders.js'
import Cart from '../../Models/Cart.js'
import Address from '../../Models/Address.js'

export const addOrder = (req, res) => {
    Cart.deleteOne({user:req.user.id}).exec((error,result)=>{
        if(error)
        {
            return res.status(400).json({error})
        }
        if(result){
            req.body.user = req.user.id
            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true,
                },
                {
                    type: "packed",
                    isCompleted: false,
                },
                {
                    type: "shipped",
                    isCompleted: false,
                },
                {
                    type: "delivered",
                    isCompleted: false,
                }
            ]
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
        .select("_id paymentStatus paymentType orderStatus items")
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

//FOR INVOICE Page we need every details of product adress in last

export const getInvoiceOrderDetails = (req, res) => {
    Order.findOne({ _id: req.body.orderId })
      .populate("items.productId", "_id name productPictures")
      .lean()
      .exec((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          Address.findOne({
            user: req.user.id,
          }).exec((error, address) => {
            if (error) return res.status(400).json({ error });
            order.address = address.address.find(
              (adr) => adr._id.toString() == order.addressId.toString()
            );
            res.status(200).json({
              order,
            });
          });
        }
      });
  };