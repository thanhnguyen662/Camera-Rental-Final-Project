import { Col, Layout, Row, notification, Button } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { storage } from '../../../../firebase';
import ProfileEditAvatarCard from '../../components/ProfileEditAvatarCard';
import ProfileEditInfoCard from '../../components/ProfileEditInfoCard';
import ProfileEditTree from '../../components/ProfileEditTree';

ProfileEditPage.propTypes = {};

const { Content } = Layout;

function ProfileEditPage(props) {
   const [defaultFileList, setDefaultFileList] = useState([]);
   const [url, setUrl] = useState('');
   const userEmail = useSelector((state) => state.users.email);
   const userName = useSelector((state) => state.users.name);
   const uid = useSelector((state) => state.users.id);
   const photoURL = useSelector((state) => state.users.photoURL);

   const userData = {
      email: userEmail,
      displayName: userName,
      id: uid,
   };

   const onFinish = async (values) => {
      console.log('Received values of form: ', values);
      const currentUser = firebase.auth().currentUser;
      currentUser
         .updateProfile({
            displayName: values.displayName,
         })
         .then(() => {
            console.log('Updated Info');
         })
         .then(() => {
            openNotificationWithIcon(
               'success',
               'Change Information',
               'Successful, reload page to take effect'
            );
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const uploadImage = async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const uploadTask = storage
         .ref(`avatars/${userEmail}/avatar/${file.name}`)
         .put(file);
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
               .ref(`avatars/${userEmail}/avatar/`)
               .child(file.name)
               .getDownloadURL()
               .then((url) => {
                  console.log(url);
                  setUrl(url);
                  onSuccess();
                  onFinishChangeAvatar(url);
               })
               .then(() => {
                  openNotificationWithIcon(
                     'success',
                     'Change Avatar',
                     'Successful, reload page to take effect'
                  );
               })
               .catch((error) => {
                  console.log(error);
                  onError();
               });
         }
      );
   };

   const onFinishChangeAvatar = async (url) => {
      const currentUser = firebase.auth().currentUser;
      currentUser
         .updateProfile({
            photoURL: url,
         })
         .then(() => {
            console.log('Updated Avatar');
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const handleOnChange = ({ fileList }) => {
      setDefaultFileList(fileList);
   };

   const onPreview = () => {
      const src = url;
      window.open(src);
   };

   const openNotificationWithIcon = (type, message, description) => {
      const btn = (
         <Button
            type='primary'
            size='small'
            onClick={() => window.location.reload()}
         >
            Reload page
         </Button>
      );
      notification[type]({
         message: message,
         description: description,
         btn,
      });
   };

   return (
      <>
         <Content style={{ margin: '0px 16px' }}>
            <div style={{ paddingTop: 24, minHeight: 360 }}>
               <Row gutter={[12, 0]}>
                  <Col span={5}>
                     <ProfileEditTree
                        userEmail={userEmail}
                        photoURL={photoURL}
                        userName={userName}
                     />
                  </Col>
                  <Col span={13}>
                     <ProfileEditInfoCard
                        userEmail={userEmail}
                        userName={userName}
                        uid={uid}
                        userData={userData}
                        onFinish={onFinish}
                     />
                  </Col>
                  <Col flex='auto' style={{ textAlign: 'center' }}>
                     <ProfileEditAvatarCard
                        uploadImage={uploadImage}
                        handleOnChange={handleOnChange}
                        defaultFileList={defaultFileList}
                        onPreview={onPreview}
                        photoURL={photoURL}
                     />
                  </Col>
               </Row>
            </div>
         </Content>
      </>
   );
}

export default ProfileEditPage;
