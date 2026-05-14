import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import post from "./Post/postSlice"
import admin from "./admin/adminSlice"
const store = configureStore({
    reducer : { auth,post,admin}
})

export default store