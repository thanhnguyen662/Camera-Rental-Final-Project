import React from 'react';
import userApi from '../../../../api/userApi';
import RegisterForm from '../../Components/RegisterForm';
import { useHistory } from 'react-router-dom';
import openNotificationWithIcon from '../../../../components/Notification';

function RegisterPage(props) {
   const history = useHistory();

   async function onRegisterFormSubmit(registerValues) {
      try {
         const response = await userApi.register(registerValues);

         if (response.message === 'Exist') {
            return openNotificationWithIcon(
               'error',
               'Register unsuccessful',
               'User already exist'
            );
         }

         openNotificationWithIcon(
            'success',
            'Register successful',
            'Create account successfully'
         );
         console.log('Create account successfully: ', response);
         history.push('/');
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
