import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { Button } from 'reactstrap';
import InputField from '../../../../custom-fields/Input-Field';
import * as Yup from 'yup';
import './LoginForm.scss';

LoginForm.propTypes = {
   onLoginFormSubmit: PropTypes.func,
   onClick: PropTypes.func,
};

LoginForm.defaultProps = {
   onLoginFormSubmit: null,
   onClick: null,
};

function LoginForm(props) {
   const { onLoginFormSubmit, onClick } = props;

   const initialValues = {
      email: '',
      password: '',
   };

   const validationSchema = Yup.object().shape({
      email: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
   });

   const handleOnSubmit = (values, { resetForm }) => {
      try {
         const loginValues = {
            email: values.email,
            password: values.password,
         };

         onLoginFormSubmit(loginValues);
         resetForm();
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   };

   const onButtonClick = () => {
      onClick();
   };

   return (
      <div>
         <h1>Login Page</h1>
         <Button onClick={onButtonClick}>Logout</Button>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
         >
            {() => {
               return (
                  <Form>
                     <FastField
                        name='email'
                        component={InputField}
                        type='email'
                        label='Email'
                     />

                     <FastField
                        name='password'
                        component={InputField}
                        type='password'
                        label='Password'
                     />

                     <Button className='mt-2' type='submit'>
                        Login
                     </Button>
                  </Form>
               );
            }}
         </Formik>
      </div>
   );
}

export default LoginForm;
