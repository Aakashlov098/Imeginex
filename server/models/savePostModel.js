import mongoose from "mongoose";

const savePostSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Post'
    }
},{
    timestamps : true
}) 

const Saved = mongoose.model("Saved",savePostSchema)
export default Saved