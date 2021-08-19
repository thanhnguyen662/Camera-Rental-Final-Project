import {
   EditOutlined,
   LogoutOutlined,
   TagsOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import conversationApi from '../../api/conversationApi';
import userApi from '../../api/userApi';
import { auth } from '../../firebase';
import Cart from '../Cart';
import './HeaderBar.scss';

const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderBar(props) {
   const location = useLocation();

   const loginStatus = useSelector((state) => state.users.loginStatus);
   const photoURL = useSelector((state) => state.users.photoURL);
   const userId = useSelector((state) => state.users.id);
   const productInCartCount = useSelector((state) => state.cart.length);
   const reduxIncomingMessage = useSelector((state) => state.messages[0]);
   const [sendMessage, setSendMessage] = useState();
   const [senderData, setSenderData] = useState();

   const openNotification = async (
      reduxIncomingMessage,
      responseSenderData
   ) => {
      try {
         const data = {
            senderId: responseSenderData.firebaseId,
            receiverId: userId,
         };
         const response = await conversationApi.createConversation(data);
         notification.open({
            message: responseSenderData.username,
            description: reduxIncomingMessage.text,
            icon: <Avatar src={responseSenderData.photoURL} />,
            onClick: () => {
               setSendMessage(response);
            },
            style: {
               cursor: 'pointer',
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (!reduxIncomingMessage) return;

      const getSenderOfMessageDetail = async () => {
         try {
            const response = await userApi.getUserProfile({
               firebaseId: reduxIncomingMessage.sender,
            });
            location.pathname !== '/messageBeta' &&
               openNotification(reduxIncomingMessage, response);
            setSenderData(response);
         } catch (error) {
            return console.log(error);
         }
      };
      getSenderOfMessageDetail();
      // eslint-disable-next-line
   }, [reduxIncomingMessage]);

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

   return (
      <Header className='headerBar' style={{ padding: '0 16px' }}>
         {sendMessage === undefined ? null : (
            <Redirect
               to={{
                  pathname: '/messageBeta',
                  state: {
                     conversationInfo: sendMessage,
                     conversationUserInfo: senderData,
                  },
               }}
            />
         )}
         <Row
            style={{ padding: '0 115px' }}
            justify='space-around'
            align='middle'
         >
            <Col flex='auto'>LOGO</Col>
            <Cart count={productInCartCount} />
            <Col>
               {loginStatus === false ? (
                  <>
                     <Button type='link' size='large'>
                        <Link to='/account/login'>Login</Link>
                     </Button>
                     <Button type='primary' shape='round' size='large'>
                        <Link to='/account/register'>Register</Link>
                     </Button>
                  </>
               ) : (
                  <>
                     <Menu mode='horizontal' subMenuCloseDelay='0.5'>
                        <SubMenu
                           key='SubMenu'
                           title={
                              <>
                                 <Avatar size={38} src={photoURL} />
                              </>
                           }
                        >
                           <Menu.Item key='setting:1' icon={<UserOutlined />}>
                              <Link to='/profile'>Profile</Link>
                           </Menu.Item>
                           <Menu.Item key='setting:2' icon={<EditOutlined />}>
                              <Link to='/profile/edit'>Edit</Link>
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
                        </SubMenu>
                     </Menu>
                  </>
               )}
            </Col>
         </Row>
      </Header>
   );
}

export default HeaderBar;
