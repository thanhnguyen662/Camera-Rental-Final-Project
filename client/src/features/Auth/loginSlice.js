import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
   name: 'user',
   initialState: {
      loginStatus: false,
      email: '',
      id: '',
      name: '',
   },
   reducers: {
      userInfo: (state, action) => {
         const { email, uid, displayName, loginStatus } = action.payload;
         state.email = email;
         state.id = uid;
         state.name = displayName;
         state.loginStatus = loginStatus;
      },
   },
});

const { reducer, actions } = login;
export const { userInfo } = actions;
export default reducer;
