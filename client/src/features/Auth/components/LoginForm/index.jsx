import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

LoginForm.propTypes = {
   handleLoginFunction: PropTypes.func,
};

LoginForm.defaultProps = {
   handleLoginFunction: null,
};

function LoginForm(props) {
   const { handleLoginFunction } = props;
   const onFinish = async (values) => {
      handleLoginFunction(values);
   };

   return (
      <>
         <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
         >
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
               <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
               </Form.Item>

               <a className='login-form-forgot' href='#/'>
                  Forgot password
               </a>
            </Form.Item>

            <Form.Item>
               <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
               >
                  Log in
               </Button>
               Or <Link to='/account/register'>register now!</Link>
            </Form.Item>
         </Form>
      </>
   );
}

export default LoginForm;
