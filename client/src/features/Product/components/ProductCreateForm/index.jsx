import { DollarCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './ProductCreateForm.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { config } from './editorConfig';
import parse from 'html-react-parser';

ProductCreateForm.propTypes = {};

ClassicEditor.defaultConfig = config;
const { Title, Text } = Typography;

const formItemLayout = {
   labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
   },
   wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
   },
};

const tailFormItemLayout = {
   wrapperCol: {
      xs: {
         span: 24,
         offset: 5,
      },
      sm: {
         span: 16,
         offset: 5,
      },
   },
};

function ProductCreateForm() {
   const [form] = Form.useForm();
   const [body, setBody] = useState('');

   const onFinish = (values) => {
      console.log('Received values of form: ', values);
   };
   console.log(body);
   const handleSubmit = (e) => {
      e.preventDefault();
      const descriptionForm = {
         description: body,
      };
      console.log(descriptionForm);
   };

   return (
      <>
         <div className='createProductInfo'>
            <div className='header'>
               <Title level={3}>Create Product</Title>
               <Text>Create new product for your company</Text>
            </div>
            <Divider className='divider' />
            <Form
               {...formItemLayout}
               form={form}
               name='createProduct'
               onFinish={onFinish}
               scrollToFirstError
            >
               <Form.Item
                  name='productName'
                  label='Name'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your product name!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name='productPrice'
                  label='Price'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your product price',
                     },
                  ]}
               >
                  <Input prefix={<DollarCircleOutlined />} suffix='USD' />
               </Form.Item>
               <Form.Item {...tailFormItemLayout}>
                  <Button type='primary' htmlType='submit'>
                     Create
                  </Button>
               </Form.Item>
            </Form>
         </div>
         <div>
            <div className='descriptionHeader'>
               <Title level={3}>Create Product Description</Title>
               <Text>Create description for your product</Text>
               <Divider className='descriptionDivider' />
            </div>
            <form onSubmit={handleSubmit} className='description'>
               <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                     const data = editor.getData();
                     setBody(data);
                  }}
               />
               <Button type='primary' htmlType='submit'>
                  Submit
               </Button>
            </form>
         </div>
         <div>{parse(body)}</div>
      </>
   );
}

export default ProductCreateForm;
