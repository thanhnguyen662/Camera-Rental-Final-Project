import { Col, Layout, Row, notification, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storage } from '../../../../firebase';
import { auth } from '../../../../firebase';
import ProfileEditAvatarCard from '../../components/ProfileEditAvatarCard';
import ProfileEditInfoCard from '../../components/ProfileEditInfoCard';
import ProfileEditTree from '../../components/ProfileEditTree';
import ProfileEditProfileCard from '../../components/ProfileEditProfileCard';
import userApi from '../../../../api/userApi';

ProfileEditPage.propTypes = {};

const { Content } = Layout;

function ProfileEditPage(props) {
   const [defaultFileList, setDefaultFileList] = useState([]);
   const [url, setUrl] = useState('');
   const [current, setCurrent] = useState(1);
   const [userProfile, setUserProfile] = useState();
   const userEmail = useSelector((state) => state.users.email);
   const userName = useSelector((state) => state.users.name);
   const uid = useSelector((state) => state.users.id);
   const photoURL = useSelector((state) => state.users.photoURL);

   const userData = {
      email: userEmail,
      displayName: userName,
      id: uid,
   };

   function handleClick(e) {
      setCurrent(parseInt(e.key));
   }

   console.log(current);

   // [FIREBASE] CHANGE ACCOUNT INFORMATION
   const onFinish = async (values) => {
      console.log('Received values of form: ', values);
      const currentUser = auth.currentUser;
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

   const updatePhotoURLToDb = async (url) => {
      await userApi.addUserInfo({
         photoURL: url,
         firebaseId: uid,
      });
   };

   // [FIREBASE] CHANGE USER AVATAR
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
                  updatePhotoURLToDb(url);
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
      const currentUser = auth.currentUser;
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

   // [DATABASE] CHANGE USER PROFILE
   const onProfileFinish = async (values) => {
      try {
         console.log('values1', values);
         const formValues = {
            firebaseId: uid,
            age: parseInt(values.age),
            gender: values.gender,
            address: values.address,
            gear: values.gear,
            favouriteGear: values.favouriteGear,
            hasTag: values.hasTag,
            description: values.description,
            photoURL: values.photoURL,
            username: values.userName,
            phoneNumber: values.phoneNumber,
         };
         const response = await userApi.addUserInfo(formValues);
         console.log('Finish: ', response);
         openNotificationWithIcon(
            'success',
            'Change Profile',
            'Successful, reload page to take effect'
         );
      } catch (error) {
         return console.log('Fail: ', error);
      }
   };

   useEffect(() => {
      const getUserProfile = async () => {
         try {
            if (!uid) return;
            const response = await userApi.getUserProfile({
               firebaseId: uid,
            });
            setUserProfile(response);
         } catch (error) {
            console.log(error);
         }
      };
      getUserProfile();
   }, [uid]);

   return (
      <>
         <Content>
            <div style={{ minHeight: 360 }}>
               <Row gutter={[25, 25]}>
                  <Col span={5}>
                     <ProfileEditTree
                        userEmail={userEmail}
                        photoURL={photoURL}
                        userName={userName}
                        handleClick={handleClick}
                     />
                  </Col>
                  <Col span={14}>
                     {current === 1 && (
                        <ProfileEditInfoCard
                           userEmail={userEmail}
                           userName={userName}
                           uid={uid}
                           userData={userData}
                           onFinish={onFinish}
                        />
                     )}
                     {current === 2 && (
                        <ProfileEditProfileCard
                           onProfileFinish={onProfileFinish}
                           userProfile={userProfile}
                           photoURL={photoURL}
                        />
                     )}
                  </Col>
                  <Col
                     span={5}
                     style={{
                        textAlign: 'center',
                     }}
                  >
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
