import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Auth/loginSlice';
import cartProductReducer from '../features/Product/productSlice';

const rootReducer = {
   users: loginReducer,
   cart: cartProductReducer,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
