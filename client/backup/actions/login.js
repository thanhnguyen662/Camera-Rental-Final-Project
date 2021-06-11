export const loginStatusSuccessfully = (status) => {
  return {
    type: 'LOGIN_STATUS',
    payload: status,
  };
};

export const getToken = (token) => {
  return {
    type: 'TOKEN',
    payload: token,
  };
};
