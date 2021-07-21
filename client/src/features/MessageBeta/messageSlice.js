import { createSlice } from '@reduxjs/toolkit';

const incomingMessages = createSlice({
   name: 'message',
   initialState: [],
   reducers: {
      newMessage: (state, action) => {
         state.length = 0;
         state.push(action.payload);
      },
   },
});

const { reducer, actions } = incomingMessages;
export const { newMessage } = actions;
export default reducer;
