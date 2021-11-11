import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Typography, Form, Input, Alert } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LoginForm.scss';

LoginForm.propTypes = {
   handleLoginFunction: PropTypes.func,
   responseLoginMessage: PropTypes.string,
};

LoginForm.defaultProps = {
   handleLoginFunction: null,
   responseLoginMessage: '',
};

const { Text } = Typography;

function LoginForm(props) {
   const { handleLoginFunction, responseLoginMessage } = props;
   const onFinish = async (values) => {
      handleLoginFunction(values);
   };

   const isResponseLoginFormMessage = () => {
      if (responseLoginMessage === 'auth/wrong-password')
         return 'Incorrect password.';
      if (responseLoginMessage === 'auth/user-not-found')
         return 'User not found.';
      return 'Error, please try again';
   };

   return (
      <>
         {responseLoginMessage && (
            <div className='loginFormAlert'>
               <Alert
                  message={isResponseLoginFormMessage()}
                  type='error'
                  showIcon
               />
            </div>
         )}
         <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
         >
            <div className='loginFormLabel'>
               <Text>Username</Text>
            </div>
            <Form.Item
               name='email'
               rules={[{ required: true, message: 'Please input your Email!' }]}
            >
               <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                  type='email'
               />
            </Form.Item>
            <div className='loginFormLabel'>
               <Text>Password</Text>
            </div>
            <Form.Item
               name='password'
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
            <Form.Item>
               <Button
                  block
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
               >
                  Log in
               </Button>
               <div>
                  <Text className='registerLink'>Not register yet?&nbsp;</Text>
                  <Link to='/account/register'>
                     <u>Create an account</u>
                  </Link>
               </div>
            </Form.Item>
         </Form>
      </>
   );
}

export default LoginForm;
