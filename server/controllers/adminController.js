import Post from "../models/postModel.js"
import Report from "../models/reportModel.js"
import User from "../models/userModels.js"

const getallUser =async(req,res)=>{
  
    const user = await User.find()

    if(!user){
        res.status(404)
        throw new Error("User Not Found!")
    }

    res.status(200).json(user)
}

const getallPosts =async(req,res)=>{
    const post = await Post.find()

    if(!post){
        res.status(404)
        throw new Error("Post's Not Found!!")
    }
    res.status(200).json(post)
}

const updatePost =async(req,res)=>{
     const postId =  req.params.pid

    const post = await Post.findById(postId)
    console.log(postId)
    if(!post){
        res.status(404)
        throw new Error("Post Not Found!")
    }

    
    const updatedpost = await Post.findByIdAndUpdate(postId,req.body,{new : true})

    if(!updatedpost){
        res.status(409)
        throw new Error("Post Not Updated!")
    }

    res.status(200).json(updatedpost)
}

const getReports = async(req,res)=>{
   
    const report = await Report.find()

    if(!report){
        res.status(404)
        throw new Error("Report's Not Found!!")
    }
    res.status(200).json(report)
}

const updateUser = async(req,res)=>{
    
    const userId =  req.params.uid

    const user = await User.findById(userId)

    if(!user){
        res.status(404)
        throw new Error("User Not Found!")
    }

    console.log(user)
    const updatedUser = await User.findByIdAndUpdate(userId,{isActive : user.isActive ? false : true},{new : true})

    if(!updatedUser){
        res.status(409)
        throw new Error("User Not Updated!")
    }

    res.status(200).json(updatedUser)


}

const adminController = {getallUser,getallPosts,getReports,updatePost,updateUser}
export default adminController