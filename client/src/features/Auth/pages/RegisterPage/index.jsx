import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import firebase from 'firebase/app';

function RegisterPage(props) {
   const handleRegisterFunction = async (values) => {
      console.log('Values Register Form: ', values);
      try {
         await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((user) => {
               console.log(user);
            })
            .catch((error) => {
               console.log(error);
            });
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <RegisterForm handleRegisterFunction={handleRegisterFunction} />
      </>
   );
}

export default RegisterPage;
