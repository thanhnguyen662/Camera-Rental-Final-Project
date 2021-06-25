import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import LoginForm from '../../components/LoginForm';

// Configure FirebaseUI.
const uiConfig = {
   signInFlow: 'redirect',
   signInSuccessUrl: '/',
   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const handleLoginFunction = async (values) => {
   console.log('Values Login Form: ', values);
   try {
      await firebase
         .auth()
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
         <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
         />

         <LoginForm handleLoginFunction={handleLoginFunction} />
      </>
   );
}

export default SignInPage;
