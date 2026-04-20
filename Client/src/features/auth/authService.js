import axios from "axios"

const API_URL = "/api/auth"

const register = async(formData)=>{
    const response = await axios.post(API_URL+"/register",formData)
    // console.log(response)
    localStorage.setItem('user',JSON.stringify(response.data))
    return response.data
}

const login = async(formData)=>{
    const response = await axios.post(API_URL+"/login",formData)
    // console.log(response)
    localStorage.setItem('user',JSON.stringify(response.data))
    return response.data
}

const fetchProfile = async(name)=>{
    
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.Token
    
    const response = await axios.get("/api/profile/" + name, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    localStorage.setItem('profile',JSON.stringify(response.data))
    return response.data
}

const sendFollowRequest = async (uid,token)=>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
    const response = await axios.put('/api/user/follow/' + uid , {} ,options)
    return response.data
    
}

const sendUnfollowRequest = async (uid,token)=>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
    const response = await axios.put('/api/user/unfollow/' + uid , {} ,options)
    console.log(response.data)
    return response.data
    
}

const authService = {register,login,fetchProfile,sendFollowRequest,sendUnfollowRequest}
export default authService