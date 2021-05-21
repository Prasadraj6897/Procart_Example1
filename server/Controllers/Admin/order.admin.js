import Order from '../../Models/Orders.js'

export const AdminUpdateOrder = async (req, res)=>{
    
    try{
            Order.updateOne(
                {_id: req.body.orderId, "orderStatus.type" : req.body.type},
                {
                    $set:{
                        "orderStatus.$": [{type:req.body.type ,date: new Date(), isCompleted: true}]
                    },
                }
            ).exec((error, order) => {
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
    catch(error){

    }

}