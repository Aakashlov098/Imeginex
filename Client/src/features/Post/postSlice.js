import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const postSlice = createSlice({
    name : 'post',
    initialState : {
      
        posts : [],
        post : {},
        postLoading : false,
        postSuccess : false,
        postError : false,
        postErrorMessage : ""
},
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(generatePost.pending ,(state,action)=>{
            state.postLoading = true,
            state.postSuccess = false,
            state.postError = false
        })
        .addCase(generatePost.fulfilled ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = true,
            state.post = action.payload
            state.postError = false
        })
        .addCase(generatePost.rejected ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = false,
            state.postError = true,
            state.postErrorMessage = action.payload
        })
        .addCase(getPosts.pending ,(state,action)=>{
            state.postLoading = true,
            state.postSuccess = false,
            state.postError = false
        })
        .addCase(getPosts.fulfilled ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = true,
            state.posts = action.payload
            state.postError = false
        })
        .addCase(getPosts.rejected ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = false,
            state.postError = true,
            state.postErrorMessage = action.payload
        })
        .addCase(getPost.pending ,(state,action)=>{
            state.postLoading = true,
            state.postSuccess = false,
            state.postError = false
        })
        .addCase(getPost.fulfilled ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = true,
            state.post = action.payload
            state.postError = false
        })
        .addCase(getPost.rejected ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = false,
            state.postError = true,
            state.postErrorMessage = action.payload
        })
        .addCase(likeUnlikePost.pending ,(state,action)=>{
            state.postLoading = true,
            state.postSuccess = false,
            state.postError = false
        })
        .addCase(likeUnlikePost.fulfilled ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = true,
            state.post.likes = action.payload.likes
            state.postError = false
        })
        .addCase(likeUnlikePost.rejected ,(state,action)=>{
            state.postLoading = false,
            state.postSuccess = false,
            state.postError = true,
            state.postErrorMessage = action.payload
        })
    }
})

export default postSlice.reducer

// GENERATE POST
export const generatePost = createAsyncThunk("AUTH/GENERATE",async(prompt,thunkAPI)=>{
    console.log(prompt)
    try {
        console.log(prompt)
        let token = thunkAPI.getState().auth.user.Token
        return await postService.generateAndPostImage(prompt,token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


//  GET-POST'S
export const getPosts = createAsyncThunk("GET/POST'S",async(pid,thunkAPI)=>{
    try {
        
        let token = thunkAPI.getState().auth.user.Token
        return await postService.fetchPosts(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//  GET-POST
export const getPost = createAsyncThunk("GET/POST",async(pid,thunkAPI)=>{
    try {
        
        let token = thunkAPI.getState().auth.user.Token
        return await postService.fetchPost(pid,token)   
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

//  GET-POST
export const likeUnlikePost = createAsyncThunk("POST/LIKEORUNLIKE",async(pid,thunkAPI)=>{
    try {
        
        let token = thunkAPI.getState().auth.user.Token
        return await postService.updateLikeUnlike(pid,token)   
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

