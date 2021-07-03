import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LoginForm from '../../components/LoginForm';
import { auth } from '../../../../firebase';

// Configure FirebaseUI.
const uiConfig = {
   signInFlow: 'redirect',
   signInSuccessUrl: '/',
   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const handleLoginFunction = async (values) => {
   console.log('Values Login Form: ', values);
   try {
      await auth
         .signInWithEmailAndPassword(values.email, values.password)
         .then((user) => {
            console.log(user);
         });

      window.location = '/';
   } catch (error) {
      console.log(error);
   }
};

function SignInPage(props) {
   return (
      <>
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />

         <LoginForm handleLoginFunction={handleLoginFunction} />
      </>
   );
}

export default SignInPage;