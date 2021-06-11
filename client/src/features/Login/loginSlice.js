import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getMe = createAsyncThunk(
   'user/getMe',
   async (params, thunkAPI) => {
      const response = await userApi.profile();
      return response;
   }
);

const login = createSlice({
   name: 'user',
   initialState: {
      loginStatus: localStorage.getItem('token') ? true : false,
      user: {},
   },
   reducers: {
      addUserInfo: (state, action) => {
         const { loginStatus } = action.payload;
         state.loginStatus = loginStatus;
      },
   },
   extraReducers: {
      [getMe.fulfilled]: (state, action) => {
         state.user = action.payload;
      },
   },
});

const { reducer, actions } = login;
export const { addUserInfo } = actions;
export default reducer;
