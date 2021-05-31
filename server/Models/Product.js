import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,

    },
    price:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
        
    },
    offers:{
        type: Number,
    },
    productPictures:[
        {
            img : {type: String}
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId, ref:'Category',
        required: true, 
    },
    reviews:[
        {
            // below is linking in mongodb connecting user database like foreign key
            userId: {
                type : mongoose.Schema.Types.ObjectId, ref:'Users'
            },
            review: String
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'Users',
        required: true, 
    },
    updatedAt : Date


}, {timestamps: true})


const Product = mongoose.model('Product', ProductSchema)

export default Product;