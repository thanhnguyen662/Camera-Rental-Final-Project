import { Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import CheckboxField from '../../../../custom-fields/Checkbox-Field';
import InputField from '../../../../custom-fields/Input-Field';
import './RegisterForm.scss';
import { storage } from '../../../../firebase';

RegisterForm.propTypes = {
   onRegisterFormSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
   onRegisterFormSubmit: null,
};

function RegisterForm(props) {
   const [image, setImage] = useState(null);
   const [progress, setProgress] = useState(0);

   const { onRegisterFormSubmit } = props;
   const initialValues = {
      email: '',
      name: '',
      password: '',
      rePassword: '',
      term: false,
   };

   const validationSchema = Yup.object().shape({
      email: Yup.string().required('This field is required'),
      name: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
      rePassword: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Password do not match')
         .required('This field is required'),
      term: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
   });

   const handleOnSubmit = (values, { resetForm }) => {
      try {
         const registerValues = {
            name: values.name,
            email: values.email,
            password: values.password,
         };
         onRegisterFormSubmit(registerValues);
         resetForm();
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   };

   const handleChange = (e) => {
      if (e.target.files[0]) {
         setImage(e.target.files[0]);
      }
   };

   console.log('Image: ', image);

   const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref('images')
               .child(image.name)
               .getDownloadURL()
               .then((url) => {
                  console.log(url);
               });
         }
      );
   };

   return (
      <div>
         <h1>Register Page</h1>
         <progress value={progress} max='100' />
         <input type='file' onChange={handleChange} />
         <button onClick={handleUpload}>Upload</button>
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
                        name='name'
                        component={InputField}
                        type='text'
                        placeholder='Name'
                        prefix={
                           <UserOutlined className='site-form-item-icon' />
                        }
                     />

                     <FastField
                        name='email'
                        component={InputField}
                        type='email'
                        placeholder='Email'
                        prefix={
                           <MailOutlined className='site-form-item-icon' />
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

                     <FastField
                        name='rePassword'
                        component={InputField}
                        type='password'
                        placeholder='Re-Password'
                        prefix={
                           <LockOutlined className='site-form-item-icon' />
                        }
                     />

                     <FastField
                        name='term'
                        component={CheckboxField}
                        label={
                           <label>
                              I have read the <a href='#/'>agreement</a>
                           </label>
                        }
                     />

                     <Button type='primary' htmlType='submit'>
                        Login
                     </Button>
                  </Form>
               );
            }}
         </Formik>
      </div>
   );
}

export default RegisterForm;
