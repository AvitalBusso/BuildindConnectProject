import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signUpUser, updateUser } from '../services/userService';

export const login = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
  try {
    const userData = await loginUser(user);
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const signUp = createAsyncThunk('user/signUp', async (user, { rejectWithValue }) => {
  try {
    const userData = await signUpUser(user);
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});

export const update = createAsyncThunk('user/update', async (user, { rejectWithValue }) => {
  try {
    const userData = await updateUser(user);
    return userData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.currentUser = {};
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(update.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
  }
});

export default userSlice.reducer;
