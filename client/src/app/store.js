import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice';

const rootReducer = {
   users: loginReducer,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
