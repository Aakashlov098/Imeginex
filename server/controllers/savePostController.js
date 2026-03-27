import Post from "../models/postModel.js"
import Saved from "../models/savePostModel.js"

// save-Post's
const savePost = async(req,res)=>{

    const userId = req.user._id
    const postId = req.params.pid

    const post = await Post.findById(postId)

    // if Post Is Coming Or Not
    if(!post){
        res.status(404)
        throw new Error("Post's Not Found!!")
    }
    //check if Save-Post Alredy Exist
    const saveExist = await Saved.findOne({user : userId})
    if(saveExist){
        res.status(409)
        throw new Error("Post Alredy Exist")
    }
    //create Post
    const savedPost = new Saved({
        user : userId,
        post : post
    })

    await savedPost.save()
    await savedPost.populate('post')

    if(!savedPost){
        res.status(404)
        throw new Error("Post's Not Saved!!")
    }

    res.status(201).json(savedPost)
}

// GET-ALL-SAVED POST'S
const getSavePost = async(req,res)=>{

  const userId = req.user._id

  const allMySavedPost = await Saved.find({user : userId}).populate('post')  

  if(!allMySavedPost){
    res.status(404)
    throw new Error("Saved-Post Not Found!!")
  }

  res.status(200).json(allMySavedPost)
}
 
// REMOVE SAVED-POST'S
const removeSavePost = async(req,res)=>{

    await Saved.findOneAndDelete(req.params.pid)
    res.status(200).json({
        _id : req.params.pid,
        msg : "Saved Post Removed!"
    })
}
const savePostController = {savePost,getSavePost,removeSavePost}
export default savePostController