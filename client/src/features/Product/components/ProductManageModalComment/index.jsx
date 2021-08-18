import {
   Avatar,
   Button,
   Col,
   Form,
   Input,
   Modal,
   Rate,
   Row,
   Typography,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

ProductManageModalComment.propTypes = {
   handleOnClickCancelCommentModal: PropTypes.func,
   commentModal: PropTypes.bool,
   handleClickCommentButton: PropTypes.func,
   userPhotoURL: PropTypes.string,
};

ProductManageModalComment.defaultProps = {
   handleOnClickCancelCommentModal: null,
   commentModal: false,
   handleClickCommentButton: null,
   userPhotoURL: '',
};

const { Title } = Typography;

function ProductManageModalComment(props) {
   const {
      handleOnClickCancelCommentModal,
      commentModal,
      handleClickCommentButton,
      userPhotoURL,
      orderItemDetail,
   } = props;

   const [form] = Form.useForm();

   return (
      <>
         <Modal
            visible={commentModal}
            onCancel={() => handleOnClickCancelCommentModal()}
            footer={false}
            width={450}
            className='productCommentModal'
         >
            <Form
               form={form}
               onFinish={(values) => {
                  handleClickCommentButton(values, orderItemDetail);
               }}
            >
               <Title level={5} className='commentModalTitle'>
                  Comment on Product
               </Title>
               <Row>
                  <Col span={3}>
                     <Avatar src={userPhotoURL} size={40} />
                  </Col>
                  <Col span={21}>
                     <Form.Item name='comment' rules={[{ required: true }]}>
                        <Input.TextArea placeholder='Write a comment...' />
                     </Form.Item>
                     <label>Rating product</label>
                     <Form.Item name='rate' rules={[{ required: true }]}>
                        <Rate />
                     </Form.Item>
                  </Col>
               </Row>

               <Form.Item
                  wrapperCol={{ offset: 20, span: 3 }}
                  style={{ marginBottom: '0px' }}
               >
                  <Button type='primary' htmlType='submit'>
                     Submit
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
}

export default ProductManageModalComment;
