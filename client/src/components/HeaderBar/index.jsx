import {
   LogoutOutlined,
   UserOutlined,
   ShoppingCartOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row, Badge } from 'antd';
import { auth } from '../../firebase';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HeaderBar.scss';

const { Header } = Layout;
const { SubMenu } = Menu;

function HeaderBar(props) {
   const loginStatus = useSelector((state) => state.users.loginStatus);
   // const name = useSelector((state) => state.users.name);
   const photoURL = useSelector((state) => state.users.photoURL);
   const productInCartCount = useSelector((state) => state.cart.length);

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
                     <b>
                        <a href='http://localhost:3000/message'>Message</a>
                     </b>
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
                        <Menu.Item key='test'>
                           <Badge count={productInCartCount} size='small'>
                              <ShoppingCartOutlined
                                 style={{ fontSize: '160%' }}
                              />
                           </Badge>
                           <Link to='/product/cart' />
                        </Menu.Item>
                        <SubMenu
                           key='SubMenu'
                           title={
                              <>
                                 <Avatar size={38} src={photoURL} />
                                 {/* <label style={{ marginLeft: '10px' }}>
                                    {name}
                                 </label> */}
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
