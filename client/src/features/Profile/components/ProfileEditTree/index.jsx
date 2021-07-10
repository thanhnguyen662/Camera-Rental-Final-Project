import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Menu, Spin } from 'antd';
import React from 'react';
import './ProfileEditTree.scss';

const { SubMenu } = Menu;

ProfileEditTree.propTypes = {};

function ProfileEditTree(props) {
   const { userEmail, userName, photoURL, handleClick } = props;

   return (
      <>
         {!userEmail && !userName ? (
            <Spin />
         ) : (
            <>
               <div className='avatar'>
                  <Row span={24}>
                     <Col span={6}>
                        <Avatar size={40} src={photoURL} />
                     </Col>
                     <Col span={18}>
                        <b>{userName}</b>
                        <p>{userEmail}</p>
                     </Col>
                  </Row>
               </div>
               <Row span={24}>
                  <Menu
                     onClick={(e) => handleClick(e)}
                     style={{ marginTop: 25 }}
                     defaultSelectedKeys={['1']}
                     defaultOpenKeys={['sub1']}
                     mode='inline'
                  >
                     <SubMenu
                        key='sub1'
                        icon={<UserOutlined />}
                        title='Account Management'
                     >
                        <Menu.ItemGroup
                           key='g1'
                           title='Change your Information'
                        >
                           <Menu.Item key='1'>Account</Menu.Item>
                           <Menu.Item key='2'>Profile</Menu.Item>
                        </Menu.ItemGroup>
                     </SubMenu>
                  </Menu>
               </Row>
            </>
         )}
      </>
   );
}

export default ProfileEditTree;
