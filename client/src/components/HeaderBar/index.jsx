import { LogoutOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import { RiShoppingBag2Line } from 'react-icons/ri';
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
