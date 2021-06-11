import { createStore } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from './reducers/login';

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export default store;

export const persistor = persistStore(store);
