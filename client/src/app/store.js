import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Auth/loginSlice';
import cartProductReducer from '../features/Product/productSlice';
import incomingMessage from '../features/MessageBeta/messageSlice';

const rootReducer = {
   users: loginReducer,
   cart: cartProductReducer,
   messages: incomingMessage,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
