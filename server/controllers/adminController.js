import User from "../models/userModels.js"

const getallUser =async(req,res)=>{
  
    const user = await User.find()

    if(!user){
        res.status(404)
        throw new Error("User Not Found!")
    }

    res.status(200).json(user)
}

const getallPosts =(req,res)=>{
    res.send("all Posts")
}

const updatePost =(req,res)=>{
    res.send("update Posts")
}

const getReports = async(req,res)=>{
    res.send("get reports")

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