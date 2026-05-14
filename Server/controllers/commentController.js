import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"

const getComments = async(req,res)=>{
    
    const postId = req.params.pid
    const comments =await Comment.find({post : postId})

    if(!comments){
        res.status(409)
        throw new Error("Comment's Not Found!")
    }

    res.status(200).json(comments)
}

const addComments = async(req,res)=>{

    const {text} = req.body 
    const postId = req.params.pid
    const userId = req.user._id

    const post = await Post.findById(postId)

    if(!post){
        res.status(404)
        throw new Error("Post Not Found!")
    }

    if(!text){
        res.status(409)
        throw new Error("Please Enter Text")
    }

    const newComment = new Comment({
        user : userId,
        post : postId,
        text : text
    })
    
     if(!newComment){
        res.status(409)
        throw new Error("Comment Not Created!!")
    }
    await newComment.save()
    await newComment.populate('user')
    await newComment.populate('post')

    res.status(201).json(newComment)

}
const removeComments = async(req,res)=>{

    try {
        const commentId = req.params.cid
    const comments = await Comment.findById(commentId)
    
    if(!comments){
        res.status(404)
        throw new Error("Comment's Not Found!")
    }

    await Comment.findByIdAndDelete(commentId)

    res.status(200).json({
        _id : commentId,
        message : "Comment Deleted!"
    })
    } catch (error) {
        
        res.status(409)
        throw new Error("Comment Not Removed")
    }
}

const commentController = {getComments,addComments,removeComments}
export default commentController