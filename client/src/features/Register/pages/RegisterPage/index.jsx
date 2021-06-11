import React from 'react';
import userApi from '../../../../api/userApi';
import RegisterForm from '../../Components/RegisterForm';

function RegisterPage(props) {
   async function onRegisterFormSubmit(registerValues) {
      try {
         const response = await userApi.register(registerValues);
         console.log('Register account successful: ', response);
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   }
   return (
      <>
         <RegisterForm onRegisterFormSubmit={onRegisterFormSubmit} />
      </>
   );
}

export default RegisterPage;
