import { Button, Form, Input, Modal, Rate } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './OrderCommentModal.scss';

OrderCommentModal.propTypes = {
   isModalVisible: PropTypes.bool,
   onFormFinish: PropTypes.func,
   handleModalVisible: PropTypes.func,
};

OrderCommentModal.defaultProps = {
   isModalVisible: false,
   onFormFinish: null,
   handleModalVisible: null,
};

function OrderCommentModal(props) {
   const { isModalVisible, onFormFinish, handleModalVisible } = props;

   return (
      <>
         <Modal
            visible={isModalVisible}
            onCancel={handleModalVisible}
            footer={false}
            width={450}
            title={<div className='modalTitle'>Comment</div>}
            className='modalCommentUserInput'
         >
            <Form
               name='basic'
               labelCol={{ span: 5 }}
               wrapperCol={{ span: 24 }}
               onFinish={onFormFinish}
            >
               <Form.Item
                  label='Comment'
                  name='content'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your Comment!',
                     },
                  ]}
               >
                  <Input.TextArea />
               </Form.Item>

               <Form.Item
                  label='Rate'
                  name='rate'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your Rate!',
                     },
                  ]}
               >
                  <Rate />
               </Form.Item>

               <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                  <Button type='primary' htmlType='submit'>
                     Submit
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
}

export default OrderCommentModal;
