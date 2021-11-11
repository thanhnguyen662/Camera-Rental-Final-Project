import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

RegisterForm.propTypes = {
   handleRegisterFunction: PropTypes.func,
};

RegisterForm.defaultProps = {
   handleRegisterFunction: null,
};

const { Text } = Typography;

function RegisterForm(props) {
   const { handleRegisterFunction } = props;

   const onFinish = (values) => {
      handleRegisterFunction(values);
   };

   return (
      <>
         <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
         >
            <div className='loginFormLabel'>
               <Text>Email</Text>
            </div>
            <Form.Item
               name='email'
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: 'Please input your Email!',
                  },
               ]}
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
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: 'Please input your Password!',
                  },
               ]}
            >
               <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
               />
            </Form.Item>

            <div className='loginFormLabel'>
               <Text>Confirm Password</Text>
            </div>
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
                  block
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
