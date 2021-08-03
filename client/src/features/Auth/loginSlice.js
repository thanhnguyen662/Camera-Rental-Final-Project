import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserProfile = createAsyncThunk(
   'user/userProfile',
   async (firebaseId) => {
      const response = await userApi.getUserProfile({ firebaseId: firebaseId });
      console.log(response);
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
      phoneNumber: '',
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
         const { username, address, role, phoneNumber } = action.payload;

         state.username = username;
         state.address = address;
         state.role = role;
         state.phoneNumber = phoneNumber;
      },
   },
});

const { reducer, actions } = login;
export const { userInfo } = actions;
export default reducer;
