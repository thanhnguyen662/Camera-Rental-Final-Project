import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import { Button } from 'reactstrap';
import InputField from '../../../../custom-fields/Input-Field';
import * as Yup from 'yup';

RegisterForm.propTypes = {
   onRegisterFormSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
   onRegisterFormSubmit: null,
};

function RegisterForm(props) {
   const { onRegisterFormSubmit } = props;
   const initialValues = {
      email: '',
      name: '',
      password: '',
      rePassword: '',
   };

   const validationSchema = Yup.object().shape({
      email: Yup.string().required('This field is required'),
      name: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
      rePassword: Yup.string().oneOf(
         [Yup.ref('password'), null],
         'Password do not match'
      ),
   });

   const handleOnSubmit = (values, { resetForm }) => {
      try {
         const registerValues = {
            email: values.email,
            password: values.password,
         };
         onRegisterFormSubmit(registerValues);
         resetForm();
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   };

   return (
      <div>
         <h1>Register Page</h1>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
         >
            {() => {
               return (
                  <Form>
                     <FastField
                        name='name'
                        component={InputField}
                        type='text'
                        label='Name'
                     />

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

                     <FastField
                        name='rePassword'
                        component={InputField}
                        type='password'
                        label='Re-Password'
                     />

                     <Button className='mt-2' type='submit'>
                        Register
                     </Button>
                  </Form>
               );
            }}
         </Formik>
      </div>
   );
}

export default RegisterForm;
