import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getMe = createAsyncThunk('user/getMe', async (thunkAPI) => {
   const params = { uid: localStorage.getItem('providerData') };
   const response = await userApi.getMe(params);
   return response;
});

const login = createSlice({
   name: 'user',
   initialState: {
      loginStatus: localStorage.getItem('providerData') ? true : false,
      email: '',
      id: '',
      name: '',
   },
   reducers: {
      addUserInfo: (state, action) => {
         const { loginStatus } = action.payload;
         state.loginStatus = loginStatus;
      },
   },
   extraReducers: {
      [getMe.fulfilled]: (state, action) => {
         state.email = action.payload.email;
         state.id = action.payload.uid;
         state.name = action.payload.displayName;
      },
   },
});

const { reducer, actions } = login;
export const { addUserInfo } = actions;
export default reducer;
