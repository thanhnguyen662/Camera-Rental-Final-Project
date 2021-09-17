import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import userApi from '../../../../api/userApi';
import ProfileInfoCard from '../../components/ProfileInfoCard';
import ProfileRelationCard from '../../components/ProfileRelationCard';

function ProfileUserPage(props) {
   const { firebaseId } = useParams();
   const userId = useSelector((state) => state.users.id);

   const [userInfo, setUserInfo] = useState({});
   const [userStats, setUserStats] = useState({});
   const [userInfoFirebase, setUserInfoFirebase] = useState([]);
   const [sendMessage, setSendMessage] = useState();

   useEffect(() => {
      const getUserByParams = async () => {
         try {
            const response = await userApi.getUserProfile({
               firebaseId: firebaseId,
            });
            setUserInfo(response);

            const userStats = await userApi.getUserStats({
               userId: firebaseId,
            });
            setUserStats(userStats);
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
         if (!userId) return;
         const formValues = {
            senderId: userId,
            receiverId: firebaseId,
         };
         const response = await conversationApi.createConversation(formValues);
         console.log('Conversation created: ', response);
         setSendMessage(response);
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <>
         {sendMessage === undefined ? null : (
            <Redirect
               to={{
                  pathname: '/messageBeta',
                  state: {
                     conversationInfo: sendMessage,
                     conversationUserInfo: userInfo,
                  },
               }}
            />
         )}
         <Row gutter={[20, 0]}>
            <Col span={17}>
               <ProfileInfoCard
                  photoURL={userInfo?.photoURL}
                  name={userInfoFirebase?.displayName}
                  userProfile={userInfo}
                  userId={userId}
                  onClickSendMessage={onClickSendMessage}
               />
            </Col>
            <Col span={7}>
               <ProfileRelationCard
                  userProfile={userInfo}
                  userStats={userStats}
               />
            </Col>
         </Row>
      </>
   );
}

export default ProfileUserPage;
