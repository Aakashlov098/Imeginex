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

const profileControllers = {myFollowers,myFollowings}

export default profileControllers