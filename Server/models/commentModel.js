import mongoose from "mongoose";

const commnetSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Post"
    },
    text : {
        type : String,
        required : true
    }
})

const Comment = mongoose.model("Comment",commnetSchema)
export default Comment