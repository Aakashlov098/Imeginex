import Post from "../models/postModel.js"
import User from "../models/userModels.js"

const myFollowers = async(req,res)=>{
    
    const user = await User.findById(req.user.id).populate('followers')

    if(!user){
        res.status(404)
        throw new Error("User Not Found!")
    }

    res.status(200).json(user.followers)
}

const myFollowings = async(req,res)=>{

  const user = await User.findById(req.user.id).populate('following')

    if(!user){
        res.status(404)
        throw new Error("User Not Found!")
    }

    res.status(200).json(user.following)
}

const getProfile = async(req,res)=>{
    
    const {name} = req.params
    // console.log(name)
    const user = await User.findOne({name : name}).populate('followers').populate('following')
    
    if(!user){
        res.status(404)
        throw new Error("User Not Found!")
    }
    const posts = await Post.find({user :user._id})

    const profile = {
        _id : user._id,
        name : user.name,
        email : user.email,
        posts : posts,
        credits : user.credits,
        bio : user.bio,
        followers : user.followers,
        following : user.following,
        createdAt : user.createdAt

    }
    res.status(200).json(profile)
}

const profileControllers = {myFollowers,myFollowings,getProfile}

export default profileControllers