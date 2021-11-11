import { Button, Card, Divider, Form, Input, Typography, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

ProfileEditProfileCard.propTypes = {
   onProfileFinish: PropTypes.func,
};

ProfileEditProfileCard.defaultProps = {
   onProfileFinish: null,
};

const { Title, Text } = Typography;
const { Option } = Select;

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

function ProfileEditProfileCard(props) {
   const { onProfileFinish, userProfile, photoURL } = props;
   console.log(userProfile);

   const handleProfileFormChange = (values) => {
      console.log('values0: ', values);
      onProfileFinish(values);
   };

   return (
      <>
         <Card hoverable={true} style={{ borderRadius: 10 }}>
            <Title level={3}>Profile Information</Title>
            <Text>Manage your Account Profile</Text>
            <Divider />
            <>
               <Form
                  {...formItemLayout}
                  name='register'
                  onFinish={handleProfileFormChange}
                  scrollToFirstError
                  initialValues={{
                     age: userProfile?.age,
                     favouriteGear: userProfile?.favouriteGear,
                     address: userProfile?.address,
                     gender: userProfile?.gender,
                     hasTag: userProfile?.hasTag,
                     description: userProfile?.description,
                     photoURL: photoURL,
                     userName: userProfile?.username,
                     phoneNumber: userProfile?.phoneNumber,
                  }}
               >
                  <Form.Item
                     name='photoURL'
                     label='Photo'
                     style={{ display: 'none' }}
                  >
                     <Input disabled />
                  </Form.Item>
                  <Form.Item name='userName' label='UserName'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='age' label='Age'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='gender' label='Gender'>
                     <Select defaultValue='Male'>
                        <Option value='Male'>Male</Option>
                        <Option value='Female'>Female</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item name='address' label='Address'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='phoneNumber' label='Phone'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='favouriteGear' label='Gear'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='hasTag' label='HasTag'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='description' label='About'>
                     <Input />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                     <Button type='primary' htmlType='submit'>
                        Submit
                     </Button>
                  </Form.Item>
               </Form>
            </>
         </Card>
      </>
   );
}

export default ProfileEditProfileCard;
