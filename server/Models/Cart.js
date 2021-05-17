import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({


    user:{
        type: mongoose.Schema.Types.ObjectId, ref:'Users',
        required: true, 
    },

    cartItems:[
        {
            // below is linking in mongodb connecting user database like foreign key
            product: {
                type : mongoose.Schema.Types.ObjectId, ref:'Product',
                required: true, 
            },
            quantity: {
                type: Number,
                default: 1
            },
            // price:{
            //     type: Number,
            //     required: true,
            // },
        }
    ]

}, {timestamps: true})


const Cart = mongoose.model('Cart', cartSchema)

export default Cart;