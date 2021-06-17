import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Menu, Row, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderBar.scss';
import userApi from '../../api/userApi';
import Search from '../../features/Search';

const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderBar(props) {
   const loginStatus = useSelector((state) => state.users.loginStatus);
   const email = useSelector((state) => state.users.email);

   async function onLogoutButtonClick() {
      try {
         const response = await userApi.logout();
         console.log('Logout successful ', response);
         localStorage.removeItem('token');

         window.location = '/';
      } catch (error) {
         console.log('Fail: ', error.message);
      }
   }

   return (
      <Header className='site-layout-background' style={{ padding: 0 }}>
         <Row>
            <Col span={6}>
               <Menu mode='horizontal'>
                  <Menu.Item key='1'>
                     <Link to='/'>Home</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                     <Link to='message'>Message</Link>
                  </Menu.Item>
                  <Menu.Item key='3'>nav 3</Menu.Item>
               </Menu>
            </Col>
            <Col span={14}>
               <Search />
            </Col>
            <Col span={4}>
               {loginStatus === false ? (
                  <>
                     <Button type='link' size='large'>
                        <Link to='/login'>Login</Link>
                     </Button>
                     <Button type='primary' shape='round' size='large'>
                        <Link to='/register'>Register</Link>
                     </Button>
                  </>
               ) : (
                  <>
                     <Menu mode='horizontal' subMenuCloseDelay='0.5'>
                        <SubMenu
                           key='SubMenu'
                           title={
                              <>
                                 <Avatar
                                    size={38}
                                    src='https://image.flaticon.com/icons/png/512/147/147144.png'
                                 />
                                 <label style={{ marginLeft: '10px' }}>
                                    {email}
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
