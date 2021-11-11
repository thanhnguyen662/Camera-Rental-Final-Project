import { Alert, Button, Col, Row, Steps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import { auth, storage } from '../../../../firebase';
import ProfileEditAvatarCard from '../../../Profile/components/ProfileEditAvatarCard';
import ProfileEditInfoCard from '../../../Profile/components/ProfileEditInfoCard';
import ProfileEditProfileCard from '../../../Profile/components/ProfileEditProfileCard';
import RegisterForm from '../../components/RegisterForm';
import './RegisterPage.scss';

const { Step } = Steps;
const { Text } = Typography;

function RegisterPage(props) {
   const location = useLocation();
   const { currentStep } = location.state || false;
   console.log('currentStep: ', currentStep);

   const [defaultFileList, setDefaultFileList] = useState([]);
   const [url, setUrl] = useState('');
   const [current, setCurrent] = useState(currentStep || 0);
   const [userProfile, setUserProfile] = useState();
   const [responseLoginMessage, setResponseLoginMessage] = useState('');
   const [responseUsernameExist, setResponseUsernameExist] = useState('');

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
         setResponseLoginMessage(error.code);
      }
   };

   // [DATABASE] CHANGE USER PROFILE
   // handle form data from edit profile form and call api
   const onProfileFinish = async (values) => {
      // console.log(values);
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
            username: values.userName,
            phoneNumber: values.phoneNumber,
         };

         const response = await userApi.addUserInfo(formValues);
         if (response.message === 'Username already exists')
            return setResponseUsernameExist(response.message);
         console.log(response);
         next();
      } catch (error) {
         console.log('Fail: ', error);
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

   const isResponseLoginFormMessage = () => {
      if (responseLoginMessage === 'auth/email-already-in-use')
         return 'Email already in use.';
      // if (responseLoginMessage === 'auth/user-not-found')
      //    return 'User not found.';
   };

   return (
      <>
         <Row span={24} className='registerPage'>
            <Col span={12}>
               <div className='loginFormContainer'>
                  <div className='loginFormHeader'>
                     <div className='loginFormTitle'>
                        <Text>Getting Started with Camera Rental</Text>
                     </div>
                     <div className='loginFormSub'>
                        <Text>Non do minim reprehenderit et laborum</Text>
                     </div>
                  </div>

                  <div className='loginForm'>
                     <div className='registerFormSteps'>
                        <Steps current={current}>
                           <Step title='Register' />
                           <Step title='Info' />
                           <Step title='Profile' />
                           <Step title='Avatar' />
                        </Steps>
                     </div>
                     {responseLoginMessage && current === 0 && (
                        <div className='loginFormAlert'>
                           <Alert
                              message={isResponseLoginFormMessage()}
                              type='error'
                              showIcon
                           />
                        </div>
                     )}
                     {responseUsernameExist && current === 2 && (
                        <div className='loginFormAlert'>
                           <Alert
                              message={responseUsernameExist}
                              type='error'
                              showIcon
                           />
                        </div>
                     )}
                     <div>
                        {current === 0 && (
                           <RegisterForm
                              handleRegisterFunction={handleRegisterFunction}
                              next={next}
                              prev={prev}
                              current={current}
                           />
                        )}
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
                           />
                        )}
                        {current === 3 && (
                           <ProfileEditAvatarCard
                              uploadImage={uploadImage}
                              handleOnChange={handleOnChange}
                              defaultFileList={defaultFileList}
                              onPreview={onPreview}
                              photoURL={photoURL}
                           />
                        )}
                        {current === 4 && (
                           <>
                              <p>Please check Email for verify your Account</p>
                              <Button onClick={() => (window.location = '/')}>
                                 Go back to home page
                              </Button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </Col>
            <Col span={12}>
               <div className='loginImage'></div>
            </Col>
         </Row>
      </>
   );
}

export default RegisterPage;

//  <Steps>
//                      {(current === 1 && (
//                         <Step
//                            status='process'
//                            title='Register'
//                            icon={<UserOutlined />}
//                         />
//                      )) || (
//                         <Step
//                            status='finish'
//                            title='Register'
//                            icon={<UserOutlined />}
//                         />
//                      )}
//                      {current === 2 ? (
//                         <Step
//                            status='process'
//                            title='Information'
//                            icon={<SolutionOutlined />}
//                         />
//                      ) : current > 2 ? (
//                         <Step
//                            status='finish'
//                            title='Information'
//                            icon={<SolutionOutlined />}
//                         />
//                      ) : (
//                         <Step
//                            status='wait'
//                            title='Information'
//                            icon={<SolutionOutlined />}
//                         />
//                      )}
//                      {current === 3 ? (
//                         <Step
//                            status='process'
//                            title='Profile'
//                            icon={<UserAddOutlined />}
//                         />
//                      ) : current > 3 ? (
//                         <Step
//                            status='finish'
//                            title='Profile'
//                            icon={<UserAddOutlined />}
//                         />
//                      ) : (
//                         <Step
//                            status='wait'
//                            title='Profile'
//                            icon={<UserAddOutlined />}
//                         />
//                      )}

//                      {current === 4 ? (
//                         <Step
//                            status='process'
//                            title='Profile'
//                            icon={<CameraOutlined />}
//                         />
//                      ) : current > 4 ? (
//                         <Step
//                            status='finish'
//                            title='Profile'
//                            icon={<CameraOutlined />}
//                         />
//                      ) : (
//                         <Step
//                            status='wait'
//                            title='Profile'
//                            icon={<CameraOutlined />}
//                         />
//                      )}

//                      {current === 5 ? (
//                         <Step
//                            status='process'
//                            title='Done'
//                            icon={<SmileOutlined />}
//                         />
//                      ) : current > 5 ? (
//                         <Step
//                            status='finish'
//                            title='Done'
//                            icon={<SmileOutlined />}
//                         />
//                      ) : (
//                         <Step
//                            status='wait'
//                            title='Done'
//                            icon={<SmileOutlined />}
//                         />
//                      )}
//                   </Steps>
