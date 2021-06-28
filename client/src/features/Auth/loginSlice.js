import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
   name: 'user',
   initialState: {
      loginStatus: false,
      email: '',
      id: '',
      name: '',
      photoURL: '',
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
});

const { reducer, actions } = login;
export const { userInfo } = actions;
export default reducer;
