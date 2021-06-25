import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import InputField from '../../../../custom-fields/Input-Field';
import './LoginForm.scss';

LoginForm.propTypes = {
   onLoginFormSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
   onLoginFormSubmit: null,
};

function LoginForm(props) {
   const { onLoginFormSubmit } = props;

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

   return (
      <div>
         <h1>Login Page</h1>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
         >
            {(formikProps) => {
               // const { values, errors, touched, submitCount } = formikProps;
               // console.log({ values, errors, touched, submitCount });

               return (
                  <Form name='normal_login' className='login-form'>
                     <FastField
                        name='email'
                        component={InputField}
                        type='email'
                        placeholder='Email'
                        prefix={
                           <UserOutlined className='site-form-item-icon' />
                        }
                     />
                     <FastField
                        name='password'
                        component={InputField}
                        type='password'
                        placeholder='Password'
                        prefix={
                           <LockOutlined className='site-form-item-icon' />
                        }
                     />
                     <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                     >
                        Login
                     </Button>
                     Or <Link to='/register'>register now!</Link>
                  </Form>
               );
            }}
         </Formik>
      </div>
   );
}

export default LoginForm;
