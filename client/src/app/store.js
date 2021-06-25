import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Auth/loginSlice';

const rootReducer = {
   users: loginReducer,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
