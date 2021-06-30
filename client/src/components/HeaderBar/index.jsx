import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { auth } from '../../firebase';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HeaderBar.scss';

const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderBar(props) {
   const loginStatus = useSelector((state) => state.users.loginStatus);
   const name = useSelector((state) => state.users.name);
   const photoURL = useSelector((state) => state.users.photoURL);

   async function onLogoutButtonClick() {
      try {
         await auth
            .signOut()
            .then(() => localStorage.removeItem('providerData'));

         window.location = '/';
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   }

   return (
      <Header className='site-layout-background' style={{ padding: '0 16px' }}>
         <Row>
            <Col span={2} offset={2}>
               LOGO
            </Col>
            <Col span={6}>
               <Menu mode='horizontal'>
                  <Menu.Item key='1'>
                     <Link to='/'>
                        <b>Home</b>
                     </Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                     <Link to='/message'>
                        <b>Messenger</b>
                     </Link>
                  </Menu.Item>
               </Menu>
            </Col>

            <Col span={5} offset={9}>
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
                                 <label style={{ marginLeft: '10px' }}>
                                    {name}
                                 </label>
                              </>
                           }
                        >
                           <Menu.Item key='setting:1' icon={<UserOutlined />}>
                              <Link to='/profile'>Profile</Link>
                           </Menu.Item>
                           <Menu.Item
                              key='setting:2'
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
