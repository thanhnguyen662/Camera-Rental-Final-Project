import React from 'react';
import LoginForm from '../../components/LoginForm/index';
import userApi from '../../../../api/userApi';
import { useDispatch } from 'react-redux';
import { addUserInfo } from '../../loginSlice';

function LoginPage(props) {
   const dispatch = useDispatch();

   async function onLoginFormSubmit(loginValues) {
      console.log('Form submit: ', loginValues);
      try {
         const response = await userApi.login(loginValues);
         console.log('Login account successful: ', response);

         //set token to localStorage
         localStorage.setItem('token', response.token);

         //set loginStatus to redux store
         const payload = {
            loginStatus: true,
         };
         const loginStatus = addUserInfo(payload);
         dispatch(loginStatus);

         window.location = '/';
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   }

   async function onLogoutButtonClick() {
      try {
         const response = await userApi.logout();
         console.log('Logout successful ', response);
         localStorage.removeItem('token');

         window.location = '/';
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   }

   return (
      <>
         <LoginForm
            onLoginFormSubmit={onLoginFormSubmit}
            onClick={onLogoutButtonClick}
         />
      </>
   );
}

export default LoginPage;
