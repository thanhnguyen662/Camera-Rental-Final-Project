import { LeftOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
   Button,
   Col,
   Divider,
   Form,
   Input,
   InputNumber,
   Modal,
   Row,
   Typography,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { config } from './editorConfig';
import './ProductCreateForm.scss';

ProductCreateForm.propTypes = {
   collectData: PropTypes.func,
   currentStep: PropTypes.number,
   nextStep: PropTypes.func,
   prevStep: PropTypes.func,
};

ProductCreateForm.defaultProps = {
   collectData: null,
   currentStep: 0,
   nextStep: null,
   prevStep: null,
};

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

function ProductCreateForm(props) {
   const { collectData, currentStep, nextStep, prevStep } = props;

   const [form] = Form.useForm();
   const [body, setBody] = useState('');
   const [info, setInfo] = useState({});

   const handleSubmit = (e) => {
      e.preventDefault();
      if (body === '') return error();
      const split = { ...info };
      split.description = body;
      collectData(split);
      nextStep();
   };

   const error = () => {
      Modal.error({
         title: 'Description is empty',
         content: 'Do not leave it blank',
      });
   };

   return (
      <>
         {currentStep === 0 && (
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
                     onFinish={(values) => {
                        console.log(values);
                        setInfo(values);
                        nextStep();
                     }}
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
                        <InputNumber
                           formatter={(value) =>
                              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                           }
                           parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                     </Form.Item>
                     <Form.Item
                        name='productBrand'
                        label='Brand'
                        rules={[
                           {
                              required: true,
                              message: 'Please input your product brand',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                     <Form.Item
                        name='productStock'
                        label='Stock'
                        rules={[
                           {
                              required: true,
                              message: 'Please input your product stock',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                     {/* <Form.Item
                        name='productAddress'
                        label='Product Address'
                        rules={[
                           {
                              required: true,
                              message: 'Please input your product address',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item> */}
                     <Form.Item {...tailFormItemLayout}>
                        <Button type='primary' htmlType='submit'>
                           Next Step
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            </>
         )}
         {currentStep === 1 && (
            <>
               <div>
                  <div className='descriptionHeader'>
                     <Row span={24}>
                        <Col span={22}>
                           <Title level={3}>Create Product Description</Title>
                           <Text>Create description for your product</Text>
                        </Col>
                        <Col span={2} className='backButton'>
                           <Button
                              shape='circle'
                              icon={<LeftOutlined />}
                              onClick={() => prevStep()}
                           />
                        </Col>
                     </Row>
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
                        Next Step
                     </Button>
                  </form>
               </div>
            </>
         )}
      </>
   );
}

export default ProductCreateForm;
