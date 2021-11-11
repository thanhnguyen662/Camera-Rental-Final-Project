import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LoginForm from '../../components/LoginForm';
import { auth } from '../../../../firebase';
import { Col, Divider, Row, Typography } from 'antd';
import './SignInPage.scss';

// Configure FirebaseUI.
const uiConfig = {
   signInFlow: 'redirect',
   signInSuccessUrl: '/',
   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const { Text } = Typography;

function SignInPage(props) {
   const [responseLoginMessage, setResponseLoginMessage] = useState('');

   const handleLoginFunction = async (values) => {
      try {
         await auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then((user) => {
               console.log(user);
            });

         window.location = '/';
      } catch (error) {
         setResponseLoginMessage(error.code);
      }
   };

   return (
      <>
         <Row span={24} className='signInPage'>
            <Col span={12}>
               <div className='loginFormContainer'>
                  <div className='loginFormHeader'>
                     <div className='loginFormTitle'>
                        <Text>Hi, Welcome Back!</Text>
                     </div>
                     <div className='loginFormSub'>
                        <Text>Non do minim reprehenderit et laborum</Text>
                     </div>
                  </div>
                  <div className='loginForm'>
                     <div className='loginByGoogle'>
                        <StyledFirebaseAuth
                           uiConfig={uiConfig}
                           firebaseAuth={auth}
                        />
                     </div>
                     <Divider plain className='loginFormDivider'>
                        Or Sign in Email
                     </Divider>
                     <div className='loginNormal'>
                        <LoginForm
                           handleLoginFunction={handleLoginFunction}
                           responseLoginMessage={responseLoginMessage}
                        />
                     </div>
                  </div>
               </div>
            </Col>
            <Col span={12}>
               <div className='loginImage'></div>
            </Col>
         </Row>
      </>
   );
}

export default SignInPage;
