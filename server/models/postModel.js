import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    imageLink : {
        type : String,
        required : true
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    caption : {
        type : String,
        required : true
    },
    isPublished : {
        type : Boolean,
        required : true,
        default : true
    }
},{
    timestamps : true
})

const Post = mongoose.model('Post',postSchema)
export default Post