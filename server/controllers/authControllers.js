import User from "../models/userModels.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async(req,res)=>{
    
   const {name,email, phone ,password,bio} = req.body
    
    // check if all Feilds are Coming
    if(!name || !email || !phone || !password || !bio){
        res.status(409)
        throw new Error("Please Fill All Deatils")
    }

    // check if user alredy Exist
    const emailExist =await User.findOne({email : email})
    const phoneExist =await User.findOne({phone : phone})

    if(emailExist || phoneExist){
        res.status(409)
        throw new Error("User Alredy Exist")
    }

    // HASHED-PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword =await bcrypt.hash(password , salt);

    // Create User
    const user = await User.create({name,email,phone,password : hashPassword,bio})

    if(!user){
        res.status(400)
        throw new Error("User Not Created!")
    }

    res.status(201).json({
        name : user.name,
        id   : user._id,
        bio :  user.bio,
        email : user.email,
        phone : user.phone,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        credits : user.credits,
        Token : ganerateToken(user._id)
    })
}

const loginUser = async(req,res)=>{
   
    const {email,password} = req.body

    // CHECK IF ALL FIELDS ARE COMING 
    if(!email || !password){
        res.status(409)
        throw new Error("Please Fill ALL Details!")
    }

    // Find User
    const user =await User.findOne({email : email})

    if(user && await bcrypt.compare(password,user.password)){
        res.status(200).json({
        name : user.name,
        id   : user._id,
        email : user.email,
        phone : user.phone,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        credits : user.credits,
        Token : ganerateToken(user._id)
    })
    }
    else{
        res.status(400)
        throw new Error("Invalid Credentials!")
    }
}

// Generate Token 
const ganerateToken =(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn : '30d'});
}
// PROTECTED CONTROLLER
const privateController =(req,res)=>{
    res.send("i am privateController")
}

const authController = {registerUser,loginUser,privateController}
export default authController