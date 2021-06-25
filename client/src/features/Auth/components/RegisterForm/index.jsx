import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { storage } from '../../../../firebase';

RegisterForm.propTypes = {
   handleRegisterFunction: PropTypes.func,
};

RegisterForm.defaultProps = {
   handleRegisterFunction: null,
};

function RegisterForm(props) {
   const { handleRegisterFunction } = props;
   const [image, setImage] = useState(null);
   const [progress, setProgress] = useState(0);

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

   const onFinish = (values) => {
      handleRegisterFunction(values);
   };

   return (
      <>
         <progress value={progress} max='100' />
         <input type='file' onChange={handleChange} />
         <button onClick={handleUpload}>Upload</button>
         <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
         >
            <Form.Item
               name='email'
               hasFeedback
               rules={[{ required: true, message: 'Please input your Email!' }]}
            >
               <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                  type='email'
               />
            </Form.Item>
            <Form.Item
               name='password'
               hasFeedback
               rules={[
                  { required: true, message: 'Please input your Password!' },
               ]}
            >
               <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
               />
            </Form.Item>

            <Form.Item
               name='confirm'
               dependencies={['password']}
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                           return Promise.resolve();
                        }
                        return Promise.reject(
                           new Error(
                              'The two passwords that you entered do not match!'
                           )
                        );
                     },
                  }),
               ]}
            >
               <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Confirm Password'
               />
            </Form.Item>

            <Form.Item>
               <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
               >
                  Register now
               </Button>
            </Form.Item>
         </Form>
      </>
   );
}

export default RegisterForm;
