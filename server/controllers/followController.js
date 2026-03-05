import User from "../models/userModels.js"

const followUserReqest = async(req,res)=>{

    let targetUser = await User.findById(req.params.uid)// jise follow krna hai Uski id
    
    let currentUser = await User.findById(req.user._id)// kon follow krna chahta hai uski Id(user khud)
    
    // check if user exist or not
    if(!targetUser || !currentUser){
        res.status(404)
        throw new Error("User Not Found!")
    }

    // ADD-FOLLOWERS
    await targetUser.save()
    res.status(200).json(targetUser).select("-password")
}

const followController = {followUserReqest}

export default followController