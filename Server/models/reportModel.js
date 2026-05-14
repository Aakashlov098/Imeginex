import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

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
    text :{
        type : String,
        required : [true, "Please Enter Text!"]
    },
    status: {
        type   : String,
        enum   : ['Pending', 'Resolved'],
        default: 'Pending'   
    },
},{
    timestamps : true
})

const Report = mongoose.model("Report",reportSchema)
export default Report