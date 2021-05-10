import mongoose from 'mongoose'

const PageSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
        
    },
    banners: [
        {
            img :{
                type: String,
            },
            navigateTo:{
                type: String, 
            }
        }
    ],
    products: [
        {
            img :{
                type: String,
            },
            navigateTo:{
                type: String, 
            }
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId, ref:'Category',
        required: true, 
    },
    
   
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'Users',
        required: true, 
    },
    updatedAt : Date


}, {timestamps: true})


const Page = mongoose.model('Page', PageSchema)

export default Page;