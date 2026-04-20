import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import post from "./Post/postSlice"
const store = configureStore({
    reducer : { auth,post}
})

export default store