import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserProfile = createAsyncThunk(
   'user/userProfile',
   async (firebaseId) => {
      const response = await userApi.getUserProfile({ firebaseId: firebaseId });
      return response;
   }
);

const login = createSlice({
   name: 'user',
   initialState: {
      loginStatus: false,
      email: '',
      id: '',
      name: '',
      photoURL: '',
      username: '',
      address: '',
      role: '',
   },
   reducers: {
      userInfo: (state, action) => {
         const { email, uid, displayName, loginStatus, photoURL } =
            action.payload;
         state.loginStatus = loginStatus;
         state.email = email;
         state.id = uid;
         state.name = displayName;
         state.photoURL = photoURL;
      },
   },
   extraReducers: {
      [getUserProfile.fulfilled]: (state, action) => {
         const { username, address, role } = action.payload;

         state.username = username;
         state.address = address;
         state.role = role;
      },
   },
});

const { reducer, actions } = login;
export const { userInfo } = actions;
export default reducer;
