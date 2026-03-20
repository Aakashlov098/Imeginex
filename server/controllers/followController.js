import User from "../models/userModels.js"

const followUserReqest = async(req,res)=>{

    let targetUser = await User.findById(req.params.uid)// jise follow krna hai Uski id
    
    let currentUser = await User.findById(req.user._id)// kon follow krna chahta hai uski Id(user khud)
    
    // check if user exist or not
    if(!targetUser || !currentUser){
        res.status(404)
        throw new Error("User Not Found!")
    }
    
    // check if alredy followed
    if(targetUser.followers.includes(currentUser._id)){
        res.status(409)
        throw new Error("Already Followed!")
    }
 
    // ADD-FOLLOWERS
    targetUser.followers.push(currentUser._id)
    await targetUser.save()    
    
    // ADD-FOLLOWING
    currentUser.following.push(targetUser._id)
    await currentUser.save()

    res.status(200).json(targetUser).select("-password")
}




const unfollowUserReqest = async(req,res)=>{

    let targetUser = await User.findById(req.params.uid)// jise unfollow krna hai Uski id
    let currentUser = await User.findById(req.user._id)// kon unfollow krna chahta hai uski Id(user khud)
    
    // check if user exist or not
    if(!targetUser || !currentUser){
        res.status(404)
        throw new Error("User Not Found!")
    }
    
    // check if alredy unfollowed
    if(!targetUser.followers.includes(currentUser._id)){
        res.status(409)
        throw new Error("Already UnFollowed!")
    }

    
    // REMOVE-FOLLOWERS
    let updateFollowersList = targetUser.followers.filter(follower => follower.toString() !== currentUser._id.toString())
    targetUser.followers = updateFollowersList
    await targetUser.save()    
    
    // REMOVE-FOLLOWING
    let updatedFollowingList = currentUser.following.filter(follower => follower.toString() !== targetUser._id.toString())
    currentUser.following = updatedFollowingList
    await currentUser.save()

    res.status(200).json(targetUser).select("-password")
}

const followController = {followUserReqest,unfollowUserReqest}

export default followController