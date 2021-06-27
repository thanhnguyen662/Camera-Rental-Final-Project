import { Form, Input, Layout, Upload, Spin, Button } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { storage } from '../../../../firebase';

ProfileEditPage.propTypes = {};

const { Content } = Layout;

function ProfileEditPage(props) {
   const [defaultFileList, setDefaultFileList] = useState([]);
   const [url, setUrl] = useState('');
   const userEmail = useSelector((state) => state.users.email);
   const userName = useSelector((state) => state.users.name);
   const userData = {
      email: userEmail,
      displayName: userName,
   };

   const onFinish = (values) => {
      console.log('Received values of form: ', values);
   };

   const uploadImage = async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      console.log('TEST: ', file);
      const uploadTask = storage.ref(`avatars/${file.name}`).put(file);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            onProgress({
               percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            });
         },
         (error) => {
            console.log(error);
         },
         () => {
            storage
               .ref('avatars')
               .child(file.name)
               .getDownloadURL()
               .then((url) => {
                  console.log(url);
                  setUrl(url);
                  onSuccess();
               })
               .catch((error) => {
                  console.log(error);
                  onError();
               });
         }
      );
   };

   const handleOnChange = ({ fileList }) => {
      setDefaultFileList(fileList);
   };

   const onPreview = () => {
      const src = url;
      window.open(src);
   };

   return (
      <>
         <Content style={{ margin: '20px 16px' }}>
            <div
               className='site-layout-background'
               style={{ padding: 27, minHeight: 360 }}
            >
               {!userEmail || !userName ? (
                  <Spin />
               ) : (
                  <Form
                     name='register'
                     onFinish={onFinish}
                     scrollToFirstError
                     initialValues={userData}
                  >
                     <Form.Item
                        name='displayName'
                        label='Nickname'
                        tooltip='What do you want others to call you?'
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item
                        name='email'
                        label='Email'
                        tooltip='What do you want others to call you?'
                     >
                        {!userEmail ? <Spin /> : <Input />}
                     </Form.Item>
                     <Button type='primary' htmlType='submit'>
                        Submit
                     </Button>
                  </Form>
               )}

               <div>
                  <Upload
                     accept='image/*'
                     customRequest={uploadImage}
                     onChange={handleOnChange}
                     listType='picture-card'
                     defaultFileList={defaultFileList}
                     onPreview={onPreview}
                     className='image-upload-grid'
                  >
                     {defaultFileList.length >= 1 ? null : (
                        <div>Upload Avatar</div>
                     )}
                  </Upload>
               </div>
            </div>
         </Content>
      </>
   );
}

export default ProfileEditPage;
