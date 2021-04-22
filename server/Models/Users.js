import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName :{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    userName :{
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password : {
        type: String,
        required: true,

    },
    ConfirmPassword : {
        type: String,
        required: true,

    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    createdAt:{
        type:Date,
        default: new Date()
    }

}, {timestamps: true});


// for encrypting password in schema level
// userSchema.virtual('password')
//     .set(function(password){
//         this.hash_Password = bcrypt.hashSync(password, 10)
//     })

// userSchema.methods= {
//     authenticate: function () {
//         return bcrypt.compareSync(password, this.hash_Password)
//     }
// }


const Users = mongoose.model('Users', userSchema)

export default Users;