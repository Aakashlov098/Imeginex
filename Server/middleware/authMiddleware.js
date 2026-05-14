import jwt from "jsonwebtoken"
import User from "../models/userModels.js"

const forUser = async(req, res, next) => {
  try {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded.id).select("-password")
      req.user = user
      if(user.isActive) {
          next()
          } 
          else {
            res.status(401)
            throw new Error('You are banned! Contact Admin!')
      }


    } else {
      res.status(401);
      throw new Error("NO Token Found!");
    }


  } catch (error) {
    res.status(401);
    throw new Error("UnAuthorized Access!",error.message);
  }
};

const forAdmin = async(req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded.id).select("-password")
      req.user = user
      if(user.isAdmin){
        next();
      }
      else{
        res.status(401);
      throw new Error("unAothorized Access !Admin Only");
      }


    } else {
      res.status(401);
      throw new Error("NO Token Found!");
    }


  } catch (error) {
    res.status(401);
    throw new Error("UnAuthorized Access!",error.message);
  }
};
const protect = {forAdmin,forUser}
export default protect;
