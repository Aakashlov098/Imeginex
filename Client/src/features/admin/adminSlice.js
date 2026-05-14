import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reducer from "../auth/authSlice";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    posts: [],
    reports: [],
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: "",
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        ((state.adminLoading = true),
          (state.adminSuccess = false),
          (state.adminError = false));
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = true),
          (state.users = action.payload),
          (state.adminError = false));
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = false),
          (state.adminError = true),
          (state.adminErrorMessage = action.payload));
      })
      .addCase(getAllPosts.pending, (state, action) => {
        ((state.adminLoading = true),
          (state.adminSuccess = false),
          (state.adminError = false));
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = true),
          (state.posts = action.payload),
          (state.adminError = false));
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = false),
          (state.adminError = true),
          (state.adminErrorMessage = action.payload));
      })
      .addCase(getAllReports.pending, (state, action) => {
        ((state.adminLoading = true),
          (state.adminSuccess = false),
          (state.adminError = false));
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = true),
          (state.reports = action.payload),
          (state.adminError = false));
      })
      .addCase(getAllReports.rejected, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = false),
          (state.adminError = true),
          (state.adminErrorMessage = action.payload));
      })
      .addCase(banUnBanUser.pending, (state, action) => {
        ((state.adminLoading = true),
          (state.adminSuccess = false),
          (state.adminError = false));
      })
      .addCase(banUnBanUser.fulfilled, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = true),
          (state.users = state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user,
          )));
        state.adminError = false;
      })
      .addCase(banUnBanUser.rejected, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = false),
          (state.adminError = true),
          (state.adminErrorMessage = action.payload));
      })
      .addCase(publishUnPublishPost.pending, (state, action) => {
        ((state.adminLoading = true),
          (state.adminSuccess = false),
          (state.adminError = false));
      })
      .addCase(publishUnPublishPost.fulfilled, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = true),
          (state.posts = state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post,
          )));
        state.adminError = false;
      })
      .addCase(publishUnPublishPost.rejected, (state, action) => {
        ((state.adminLoading = false),
          (state.adminSuccess = false),
          (state.adminError = true),
          (state.adminErrorMessage = action.payload));
      })
      .addCase(deleteReport.pending, (state) => {
        state.adminLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        // deleted report ko state se hata do
        state.reports = state.reports.filter(
          (r) => r._id !== action.payload._id,
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(resolveReport.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        // us report ko updated data se replace karo
        state.reports = state.reports.map((r) =>
          r._id === action.payload._id ? action.payload : r,
        );
      });
  },
});

export default adminSlice.reducer;

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "FETCH/ADMIN/USER'S",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.Token;
    try {
      return await adminService.fetchAllUsers(token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// GET ALL POSTS
export const getAllPosts = createAsyncThunk(
  "FETCH/ADMIN/POST'S",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.Token;
    try {
      return await adminService.fetchAllPosts(token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// GET ALL POSTS
export const getAllReports = createAsyncThunk(
  "FETCH/ADMIN/REPORT'S",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.Token;
    try {
      return await adminService.fetchAllReports(token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Ban/Unban User
export const banUnBanUser = createAsyncThunk(
  "ADMIN/UPDATE/USER",
  async (uid, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.Token;
    try {
      return await adminService.updateUser(uid, token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Publish/UnPublish Post
export const publishUnPublishPost = createAsyncThunk(
  "ADMIN/UPDATE/POST",
  async (pid, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.Token;
    try {
      return await adminService.updatePost(pid, token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//Delete-Reports
export const deleteReport = createAsyncThunk(
  "admin/deleteReport",
  async (rid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.Token;
      return await adminService.deleteReport(rid, token);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Resolve-reportPost
export const resolveReport = createAsyncThunk(
  "admin/resolveReport",
  async (rid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.Token;
      return await adminService.resolveReport(rid, token);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
