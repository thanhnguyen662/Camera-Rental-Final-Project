import {
   EditOutlined,
   LogoutOutlined,
   TagsOutlined,
   UserOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Badge,
   Button,
   Col,
   Layout,
   Menu,
   notification,
   Row,
} from 'antd';
import React, { useEffect } from 'react';
import { RiShoppingBag2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';
import { auth } from '../../firebase';
import './HeaderBar.scss';

const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderBar(props) {
   const loginStatus = useSelector((state) => state.users.loginStatus);
   const photoURL = useSelector((state) => state.users.photoURL);
   const productInCartCount = useSelector((state) => state.cart.length);
   const reduxIncomingMessage = useSelector((state) => state.messages[0]);

   const openNotification = (reduxIncomingMessage, photoURL, username) => {
      notification.open({
         message: username,
         description: reduxIncomingMessage.text,
         icon: <Avatar src={photoURL} />,
      });
   };

   useEffect(() => {
      if (!reduxIncomingMessage) return;

      const getSenderOfMessageDetail = async () => {
         try {
            const response = await userApi.getUserProfile({
               firebaseId: reduxIncomingMessage.sender,
            });
            openNotification(
               reduxIncomingMessage,
               response.photoURL,
               response.username
            );
         } catch (error) {
            return console.log(error);
         }
      };
      getSenderOfMessageDetail();
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
         <Row>
            <Col span={2} style={{ marginLeft: '130px' }}>
               LOGO
            </Col>

            <Col span={5} offset={13}>
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
                     <Menu
                        mode='horizontal'
                        subMenuCloseDelay='0.5'
                        style={{ marginLeft: '150px' }}
                     >
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

                        <Menu.Item key='setting'>
                           <Link to='/product/cart'>
                              <Badge count={productInCartCount} size='small'>
                                 <RiShoppingBag2Line
                                    style={{
                                       fontSize: '160%',
                                       marginBottom: '-7px',
                                    }}
                                 />
                              </Badge>
                           </Link>
                        </Menu.Item>
                     </Menu>
                  </>
               )}
            </Col>
         </Row>
      </Header>
   );
}

export default HeaderBar;
