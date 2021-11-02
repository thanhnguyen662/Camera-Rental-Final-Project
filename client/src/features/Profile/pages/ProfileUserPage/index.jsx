// import { Col, Row } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Redirect, useParams } from 'react-router-dom';
// import conversationApi from '../../../../api/conversationApi';
// import productApi from '../../../../api/productApi';
// import userApi from '../../../../api/userApi';
// import ProfileContent from '../../components/ProfileContent';
// import ProfileInfoCard from '../../components/ProfileInfoCard';
// import ProfileRelationCard from '../../components/ProfileRelationCard';

// function ProfileUserPage(props) {
//    const { firebaseId } = useParams();
//    const userId = useSelector((state) => state.users.id);

//    const [userInfo, setUserInfo] = useState({});
//    const [userStats, setUserStats] = useState({});
//    const [userInfoFirebase, setUserInfoFirebase] = useState([]);
//    const [userProduct, setUserProduct] = useState([]);
//    const [sendMessage, setSendMessage] = useState();

//    useEffect(() => {
//       const getUserByParams = async () => {
//          try {
//             const response = await userApi.getUserProfile({
//                firebaseId: firebaseId,
//             });
//             setUserInfo(response);

//             const userStats = await userApi.getUserStats({
//                userId: firebaseId,
//             });
//             setUserStats(userStats);
//          } catch (error) {
//             return console.log('Error: ', error);
//          }
//       };
//       getUserByParams();
//    }, [firebaseId]);

//    useEffect(() => {
//       const getUserByParamsFirebase = async () => {
//          try {
//             const response = await userApi.getFriendsId({
//                uid: firebaseId,
//             });
//             setUserInfoFirebase(response);
//          } catch (error) {
//             return console.log('Error: ', error);
//          }
//       };
//       getUserByParamsFirebase();
//    }, [firebaseId]);

//    useEffect(() => {
//       const getUserProduct = async () => {
//          try {
//             const response = await productApi.getMyProduct({
//                firebaseId: firebaseId,
//             });
//             setUserProduct(response);
//             console.log(response);
//          } catch (error) {
//             console.log(error);
//          }
//       };
//       getUserProduct();
//    }, [firebaseId]);

//    const onClickSendMessage = async () => {
//       try {
//          if (!userId) return;
//          const formValues = {
//             senderId: userId,
//             receiverId: firebaseId,
//          };
//          const response = await conversationApi.createConversation(formValues);
//          console.log('Conversation created: ', response);
//          setSendMessage(response);
//       } catch (error) {
//          return console.log('Error: ', error);
//       }
//    };

//    return (
//       <>
//          {sendMessage === undefined ? null : (
//             <Redirect
//                to={{
//                   pathname: '/messageBeta',
//                   state: {
//                      conversationInfo: sendMessage,
//                      conversationUserInfo: userInfo,
//                   },
//                }}
//             />
//          )}
//          <Row gutter={[20, 0]}>
//             <Col span={18}>
//                <ProfileInfoCard
//                   photoURL={userInfo?.photoURL}
//                   name={userInfoFirebase?.displayName}
//                   userProfile={userInfo}
//                   userId={userId}
//                   onClickSendMessage={onClickSendMessage}
//                />
//                <div style={{ marginTop: 15 }}>
//                   <ProfileContent userProduct={userProduct} />
//                </div>
//             </Col>
//             <Col span={6}>
//                <ProfileRelationCard
//                   userProfile={userInfo}
//                   userStats={userStats}
//                />
//             </Col>
//          </Row>
//       </>
//    );
// }

// export default ProfileUserPage;
