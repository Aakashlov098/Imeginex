import {
  createAsyncThunk,
  createSlice,
  formatProdErrorMessage,
} from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));
let profileExist = JSON.parse(localStorage.getItem("profile"));
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null,
    profile: profileExist || null,
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        ((state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = true),
          (state.user = action.payload));
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload));
      })

      .addCase(loginUser.pending, (state, action) => {
        ((state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = true),
          (state.user = action.payload));
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload));
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = false),
          (state.message = ""),
          (state.user = null));
      })
      .addCase(getProfile.pending, (state, action) => {
        ((state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false));
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = true),
          (state.profile = action.payload));
        state.isError = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload));
      })
      .addCase(follow.pending, (state, action) => {
        ((state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false));
      })
      .addCase(follow.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = true),
          (state.profile = {
            ...state.profile,
            following: [...state.profile.following, action.payload],
          }));
        state.isError = false;
      })
      .addCase(follow.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload));
      })
      .addCase(unfollow.pending, (state, action) => {
        ((state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false));
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = true),
          (state.profile = {
            ...state.profile,
            following: state.profile.following.filter(
              (follow) => follow._id !== action.payload._id,
            ),
          }));
        state.isError = false;
      })
      .addCase(unfollow.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.message = action.payload));
      });
  },
});

export default authSlice.reducer;

// REGISTER-USER
export const registerUser = createAsyncThunk(
  "AUTH/REGISTER",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      return await authService.register(formData);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// LOGIN-USER
export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      console.log(userExist);
      return await authService.login(formData);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// LOGOUT-USER
export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user");
});

// Get Profile

export const getProfile = createAsyncThunk(
  "GET/PROFILE",
  async (name, thunkAPI) => {
    try {
      return await authService.fetchProfile(name);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//  FOLLOW
export const follow = createAsyncThunk(
  "FOLLOW/PROFILE",
  async (uid, thunkAPI) => {
    try {
      console.log(uid);
      let token = thunkAPI.getState().auth.user.Token;
      return await authService.sendFollowRequest(uid, token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//  UNFOLLOW
export const unfollow = createAsyncThunk(
  "UNFOLLOW/PROFILE",
  async (uid, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.Token;
      return await authService.sendUnfollowRequest(uid, token);
    } catch (error) {
      let message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
