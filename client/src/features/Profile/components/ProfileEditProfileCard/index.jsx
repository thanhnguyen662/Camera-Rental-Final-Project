import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import React from 'react';

ProfileEditProfileCard.propTypes = {};

const { Title, Text } = Typography;

function ProfileEditProfileCard(props) {
   const { onProfileFinish, userProfile } = props;
   console.log(userProfile);

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

   const handleProfileFormChange = (values) => {
      onProfileFinish(values);
   };

   return (
      <>
         <Card hoverable={true}>
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
                     age: userProfile.age,
                     favouriteGear: userProfile.favouriteGear,
                     address: userProfile.address,
                     gender: userProfile.gender,
                     hasTag: userProfile.hasTag,
                  }}
               >
                  <Form.Item name='age' label='Age'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='gender' label='Gender'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='address' label='Address'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='favouriteGear' label='Gear'>
                     <Input />
                  </Form.Item>
                  <Form.Item name='hasTag' label='HasTag'>
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
