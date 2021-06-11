import storage from 'redux-persist/lib/storage';

const initialState = {
  loginStatus: false,
  token: null,
};

const persistConfig = {
  key: 'login_status',
  storage: storage,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_STATUS': {
      const newLoginStatus = action.payload;
      return {
        ...state,
        loginStatus: newLoginStatus,
      };
    }

    case 'TOKEN': {
      const newToken = action.payload;
      return {
        ...state,
        token: newToken,
      };
    }

    default: {
      return state;
    }
  }
};

export default loginReducer;
export { persistConfig };
