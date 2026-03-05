import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please Enter Your Name"]
    },
    email : {
        type : String,
        required : [true,"Please Enter Your Email"],
        unique : true 
        },
    phone : {
        type : String,
        required : [true,"Please Enter Your Phone No."],
        unique : true 
        },
    password : {
        type : String,
        required : [true ,"Please Enter Your Password"]
    },
    avatar : {
        type : String,
        default : "",
    },
    bio : {
        type : String,
        required : [true,"Please Enter Your Bio"]
    },
    following : [{
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }],
    followers :[{
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }],
    isAdmin : {
        type : Boolean,
        default : false,
        required :true
    },
    isActive : {
        type : Boolean,
        default : true,
        required : true
    },
    credits : {
        type : Number,
        default : 5,
        required : true 
    }

},{
    timestamps : true
})

const user = mongoose.model('User',userSchema)
export default user