import { Button, Card, Form, Input, Spin, Divider, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

ProfileEditInfoCard.propTypes = {
   userEmail: PropTypes.string,
   userName: PropTypes.string,
   uid: PropTypes.string,
   userData: PropTypes.object,
   onFinish: PropTypes.func,
};

ProfileEditInfoCard.defaultProps = {
   userEmail: '',
   userName: '',
   uid: '',
   userData: {},
   onFinish: null,
};

const { Title, Text } = Typography;

function ProfileEditInfoCard(props) {
   const { userEmail, userName, uid, userData, onFinish } = props;
   const formItemLayout = {
      labelCol: {
         xs: { span: 24 },
         sm: { span: 3 },
      },
      wrapperCol: {
         xs: { span: 24 },
         sm: { span: 20 },
      },
   };

   const tailFormItemLayout = {
      wrapperCol: {
         xs: {
            span: 24,
            offset: 0,
         },
         sm: {
            span: 16,
            offset: 3,
         },
      },
   };

   return (
      <>
         <Card hoverable={true} style={{ borderRadius: 10 }}>
            <Title level={3}>Account Information</Title>
            <Text>Manage your account</Text>
            <Divider />
            {!userEmail && !userName && !uid ? (
               <Spin />
            ) : (
               <>
                  <Form
                     {...formItemLayout}
                     name='register'
                     onFinish={onFinish}
                     scrollToFirstError
                     initialValues={userData}
                  >
                     <Form.Item name='id' label='Id'>
                        <Input disabled />
                     </Form.Item>

                     <Form.Item name='email' label='Email'>
                        {!userEmail ? <Spin /> : <Input disabled />}
                     </Form.Item>

                     <Form.Item name='displayName' label='Name'>
                        <Input />
                     </Form.Item>

                     <Form.Item {...tailFormItemLayout}>
                        <Button type='primary' htmlType='submit'>
                           Submit
                        </Button>
                     </Form.Item>
                  </Form>
               </>
            )}
         </Card>
      </>
   );
}

export default ProfileEditInfoCard;
