import {
   CameraOutlined,
   SmileOutlined,
   SolutionOutlined,
   UserAddOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import { auth, storage } from '../../../../firebase';
import ProfileEditAvatarCard from '../../../Profile/components/ProfileEditAvatarCard';
import ProfileEditInfoCard from '../../../Profile/components/ProfileEditInfoCard';
import ProfileEditProfileCard from '../../../Profile/components/ProfileEditProfileCard';
import RegisterForm from '../../components/RegisterForm';

const { Content } = Layout;
const { Step } = Steps;

function RegisterPage(props) {
   const location = useLocation();
   const { currentStep } = location.state || false;

   const [defaultFileList, setDefaultFileList] = useState([]);
   const [url, setUrl] = useState('');
   const [current, setCurrent] = useState(currentStep || 1);
   const [userProfile, setUserProfile] = useState();
   const userEmail = useSelector((state) => state.users.email);
   const userName = useSelector((state) => state.users.name);
   const uid = useSelector((state) => state.users.id);
   const photoURL = useSelector((state) => state.users.photoURL);

   //handle button prev, next event
   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };

   //Collect User Data from Firebase for showing in Account Information update
   const userData = {
      email: userEmail,
      displayName: userName,
      id: uid,
   };

   //[FIREBASE] CHANGE ACCOUNT INFORMATION
   //Handle form from account edit in firebase
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
            next();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   //handle event create account with email & password in Firebase
   const handleRegisterFunction = async (values) => {
      console.log('Values Register Form: ', values);
      try {
         await auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((user) => {
               console.log(user);
               next();
            });

         await auth.currentUser.sendEmailVerification().then(() => {
            console.log('Email was sent to your email');
         });
      } catch (error) {
         console.log(error);
      }
   };

   // [DATABASE] CHANGE USER PROFILE
   // handle form data from edit profile form and call api
   const onProfileFinish = async (values) => {
      console.log(values);
      try {
         const formValues = {
            firebaseId: uid,
            age: parseInt(values.age),
            gender: values.gender,
            address: values.address,
            gear: values.gear,
            favouriteGear: values.favouriteGear,
            hasTag: values.hasTag,
            photoURL: values.photoURL,
            description: values.description,
         };

         const response = await userApi.addUserInfo(formValues);
         console.log(response);
         next();
      } catch (error) {
         return console.log('Fail: ', error);
      }
   };

   //get user profile info for init values in edit profile form
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

   const updatePhotoURLToDb = async (url) => {
      try {
         await userApi.addUserInfo({
            photoURL: url,
            firebaseId: uid,
         });
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   // [FIREBASE] CHANGE USER AVATAR
   // handle avatar change in firebase
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
               .catch((error) => {
                  console.log(error);
                  onError();
               });
         }
      );
   };

   //update avatar in account
   const onFinishChangeAvatar = async (url) => {
      const currentUser = auth.currentUser;
      currentUser
         .updateProfile({
            photoURL: url,
         })
         .then(() => {
            console.log('Updated Avatar');
         })
         .then(() => {
            next();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // handle change in upload input
   const handleOnChange = ({ fileList }) => {
      setDefaultFileList(fileList);
   };

   // handle onPreview image
   const onPreview = () => {
      const src = url;
      window.open(src);
   };

   return (
      <>
         <Content style={{ margin: '0 160px' }}>
            <div
               className='site-layout-background'
               style={{ padding: 27, minHeight: 360, margin: '160px' }}
            >
               <Steps>
                  {(current === 1 && (
                     <Step
                        status='process'
                        title='Register'
                        icon={<UserOutlined />}
                     />
                  )) || (
                     <Step
                        status='finish'
                        title='Register'
                        icon={<UserOutlined />}
                     />
                  )}
                  {current === 2 ? (
                     <Step
                        status='process'
                        title='Information'
                        icon={<SolutionOutlined />}
                     />
                  ) : current > 2 ? (
                     <Step
                        status='finish'
                        title='Information'
                        icon={<SolutionOutlined />}
                     />
                  ) : (
                     <Step
                        status='wait'
                        title='Information'
                        icon={<SolutionOutlined />}
                     />
                  )}
                  {current === 3 ? (
                     <Step
                        status='process'
                        title='Profile'
                        icon={<UserAddOutlined />}
                     />
                  ) : current > 3 ? (
                     <Step
                        status='finish'
                        title='Profile'
                        icon={<UserAddOutlined />}
                     />
                  ) : (
                     <Step
                        status='wait'
                        title='Profile'
                        icon={<UserAddOutlined />}
                     />
                  )}

                  {current === 4 ? (
                     <Step
                        status='process'
                        title='Profile'
                        icon={<CameraOutlined />}
                     />
                  ) : current > 4 ? (
                     <Step
                        status='finish'
                        title='Profile'
                        icon={<CameraOutlined />}
                     />
                  ) : (
                     <Step
                        status='wait'
                        title='Profile'
                        icon={<CameraOutlined />}
                     />
                  )}

                  {current === 5 ? (
                     <Step
                        status='process'
                        title='Done'
                        icon={<SmileOutlined />}
                     />
                  ) : current > 5 ? (
                     <Step
                        status='finish'
                        title='Done'
                        icon={<SmileOutlined />}
                     />
                  ) : (
                     <Step
                        status='wait'
                        title='Done'
                        icon={<SmileOutlined />}
                     />
                  )}
               </Steps>
               {current >= 5 ? (
                  <></>
               ) : (
                  <Button type='primary' onClick={() => next()}>
                     Next
                  </Button>
               )}

               {current <= 1 ? (
                  <></>
               ) : (
                  <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                     Previous
                  </Button>
               )}
               <div
                  style={{
                     paddingTop: 24,
                     minHeight: 360,
                  }}
               >
                  {current === 1 && (
                     <RegisterForm
                        handleRegisterFunction={handleRegisterFunction}
                        next={next}
                        prev={prev}
                        current={current}
                     />
                  )}
                  {current === 2 && (
                     <ProfileEditInfoCard
                        userEmail={userEmail}
                        userName={userName}
                        uid={uid}
                        userData={userData}
                        onFinish={onFinish}
                     />
                  )}
                  {current === 3 && (
                     <ProfileEditProfileCard
                        onProfileFinish={onProfileFinish}
                        userProfile={userProfile}
                     />
                  )}
                  {current === 4 && (
                     <ProfileEditAvatarCard
                        uploadImage={uploadImage}
                        handleOnChange={handleOnChange}
                        defaultFileList={defaultFileList}
                        onPreview={onPreview}
                        photoURL={photoURL}
                     />
                  )}
                  {current === 5 && (
                     <p>Please check Email for verify your Account</p>
                  )}
               </div>
            </div>
         </Content>
      </>
   );
}

export default RegisterPage;
