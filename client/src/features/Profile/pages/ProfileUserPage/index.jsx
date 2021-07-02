import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import userApi from '../../../../api/userApi';
import ProfileInfoCard from '../../components/ProfileInfoCard';

function ProfileUserPage(props) {
   const { firebaseId } = useParams();
   const [userInfo, setUserInfo] = useState([]);
   const [userInfoFirebase, setUserInfoFirebase] = useState([]);
   const userId = useSelector((state) => state.users.id);

   useEffect(() => {
      const getUserByParams = async () => {
         try {
            const response = await userApi.getUserProfile({
               firebaseId: firebaseId,
            });
            setUserInfo(response);
         } catch (error) {
            return console.log('Error: ', error);
         }
      };
      getUserByParams();
   }, [firebaseId]);

   useEffect(() => {
      const getUserByParamsFirebase = async () => {
         try {
            const response = await userApi.getFriendsId({
               uid: firebaseId,
            });
            setUserInfoFirebase(response);
         } catch (error) {
            return console.log('Error: ', error);
         }
      };
      getUserByParamsFirebase();
   }, [firebaseId]);

   const onClickSendMessage = async () => {
      try {
         if (!userId) return console.log('WAIT FOR REDUX');
         const formValues = {
            senderId: userId,
            receiverId: firebaseId,
         };
         const response = await conversationApi.createConversation(formValues);
         console.log('Conversation created: ', response);
         localStorage.setItem('selectedConversation', JSON.stringify(response));
         window.location = '/message/';
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <>
         <div style={{ paddingTop: 24, minHeight: 360 }}>
            <Row gutter={[12, 0]}>
               <Col span={8}>
                  <ProfileInfoCard
                     email={userInfoFirebase?.email}
                     photoURL={userInfo?.photoURL}
                     name={userInfoFirebase?.displayName}
                     userProfile={userInfo}
                  />
               </Col>
               <Col flex='auto'>
                  <Button onClick={onClickSendMessage}>Send Message</Button>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default ProfileUserPage;
