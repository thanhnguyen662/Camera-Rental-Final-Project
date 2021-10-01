import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Auth/loginSlice';
import cartProductReducer from '../features/Product/productSlice';
import incomingMessage from '../features/MessageBeta/messageSlice';
import socketMessage from '../features/MessageBeta1/messageBeta1Slice';

const rootReducer = {
   users: loginReducer,
   cart: cartProductReducer,
   messages: incomingMessage,
   socketMessage: socketMessage,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
