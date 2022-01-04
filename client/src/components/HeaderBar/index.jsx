import { LogoutOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';
import {
   Avatar,
   Button,
   Col,
   Dropdown,
   Image,
   Layout,
   Menu,
   notification,
   Row,
   Space,
} from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import Cart from '../Cart';
import SearchBar from '../SearchBar';
import './HeaderBar.scss';

const { Header } = Layout;

function HeaderBar(props) {
   const location = useLocation();
   const history = useHistory();

   const loginStatus = useSelector((state) => state.users.loginStatus);
   const photoURL = useSelector((state) => state.users.photoURL);
   const userId = useSelector((state) => state.users.id);
   const productInCartCount = useSelector((state) => state.cart.length);
   // const reduxIncomingMessage = useSelector((state) => state.messages[0]);
   // const [sendMessage, setSendMessage] = useState();
   // const [senderData, setSenderData] = useState();

   const socketMessage = useSelector((state) => state.socketMessage);

   // const openNotification = async (
   //    reduxIncomingMessage,
   //    responseSenderData
   // ) => {
   //    try {
   //       const data = {
   //          senderId: responseSenderData.firebaseId,
   //          receiverId: userId,
   //       };
   //       const { text } = reduxIncomingMessage;
   //       const response = await conversationApi.createConversation(data);
   //       notification.open({
   //          message: responseSenderData.username,
   //          description:
   //             text?.split('.').length === 6 &&
   //             text?.split('.')[0] === 'https://firebasestorage' &&
   //             text?.split('.')[2] === 'com/v0/b/camera-rental-firbase' ? (
   //                <b>Image</b>
   //             ) : (
   //                text
   //             ),
   //          icon: <Avatar src={responseSenderData.photoURL} />,
   //          onClick: () => {
   //             setSendMessage(response);
   //          },
   //          style: {
   //             cursor: 'pointer',
   //          },
   //       });
   //    } catch (error) {
   //       console.log(error);
   //    }
   // };

   // useEffect(() => {
   //    setSendMessage();
   // }, [location]);

   // useEffect(() => {
   //    if (!reduxIncomingMessage) return;
   //    const getSenderOfMessageDetail = async () => {
   //       try {
   //          const response = await userApi.getUserProfile({
   //             firebaseId: reduxIncomingMessage.sender,
   //          });
   //          location.pathname !== '/messageBeta' &&
   //             openNotification(reduxIncomingMessage, response);
   //          setSenderData(response);
   //       } catch (error) {
   //          return console.log(error);
   //       }
   //    };
   //    getSenderOfMessageDetail();
   //    // eslint-disable-next-line
   // }, [reduxIncomingMessage]);

   const openNotification = (socketMessage) => {
      notification.open({
         key: socketMessage.id,
         message: socketMessage.sender.username,
         description:
            isType(socketMessage.content) === 'text' ? (
               socketMessage.content
            ) : (
               <b>Image</b>
            ),
         icon: <Avatar src={socketMessage.sender.photoURL} />,
         onClick: () =>
            history.push(`/messageBeta1/${socketMessage.conversationId}`),
      });
   };

   const isType = (content) => {
      if (
         content.split('.').length === 6 &&
         content.split('.')[0] === 'https://firebasestorage' &&
         content.split('.')[2] === 'com/v0/b/camera-rental-firbase'
      ) {
         return 'image';
      } else {
         return 'text';
      }
   };

   useEffect(() => {
      if (Object.keys(socketMessage).length === 0) return;
      if (location.pathname.split('/')[1] === 'messageBeta1') return;
      openNotification(socketMessage);
      // eslint-disable-next-line
   }, [socketMessage]);

   async function onLogoutButtonClick() {
      try {
         await auth
            .signOut()
            .then(() => localStorage.removeItem('providerData'))
            .then(() => localStorage.removeItem('isExist'));

         window.location = '/';
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   }

   const menu = (
      <Menu>
         <Menu.Item key='setting:1' icon={<UserOutlined />}>
            <Link to={`/profile/${userId}`}>Profile</Link>
         </Menu.Item>
         <Menu.Item key='setting:4' icon={<TagsOutlined />}>
            <Link to='/product/create'>Create Product</Link>
         </Menu.Item>
         <Menu.Item
            key='setting:3'
            icon={<LogoutOutlined />}
            onClick={() => {
               onLogoutButtonClick();
            }}
         >
            Logout
         </Menu.Item>
      </Menu>
   );

   return (
      <Header className='headerBar' style={{ padding: '0 16px' }}>
         {/* {sendMessage === undefined ? null : (
            <Redirect
               to={{
                  pathname: '/messageBeta',
                  state: {
                     conversationInfo: sendMessage,
                     conversationUserInfo: senderData,
                  },
               }}
            />
         )} */}
         <Row
            style={{ padding: '0 115px ' }}
            justify='space-around'
            align='middle'
         >
            <Col flex='auto' style={{ display: 'flex', alignItems: 'center' }}>
               <Image
                  preview={false}
                  width='180px'
                  src='https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/logo-camera-rental.png?alt=media&token=4b701a10-7354-4509-a1bf-dea87af804c8'
               />
            </Col>
            {loginStatus === false ? (
               <Col>
                  <>
                     <Button type='link' size='large'>
                        <Link to='/account/login'>Login</Link>
                     </Button>
                     <Button type='primary' shape='round' size='large'>
                        <Link to='/account/register'>Register</Link>
                     </Button>
                  </>
               </Col>
            ) : (
               <>
                  <Space size={10}>
                     <Col>
                        <SearchBar />
                     </Col>
                     <Col>
                        <Cart count={productInCartCount} />
                     </Col>
                     <Col>
                        <Dropdown overlay={menu}>
                           <Avatar
                              size={38}
                              src={photoURL}
                              style={{ marginBottom: 2 }}
                           />
                        </Dropdown>
                     </Col>
                  </Space>
               </>
            )}
         </Row>
      </Header>
   );
}

export default HeaderBar;
