import { createSlice } from '@reduxjs/toolkit';

const socketMessage = createSlice({
   name: 'socketMessage',
   initialState: {},
   reducers: {
      newMessage: (state, action) => {
         const { sender, content, conversationId, createdAt, id } =
            action.payload;
         state.sender = sender;
         state.content = content;
         state.conversationId = conversationId;
         state.createdAt = createdAt;
         state.id = id;
      },
   },
});

const { reducer, actions } = socketMessage;
export const { newMessage } = actions;
export default reducer;
