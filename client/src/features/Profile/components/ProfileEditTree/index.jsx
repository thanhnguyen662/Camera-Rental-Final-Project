import { UserOutlined } from '@ant-design/icons';
import { Card, Comment, Menu, Spin } from 'antd';
import React from 'react';

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
               <Card hoverable={true}>
                  <Comment
                     author={userEmail}
                     avatar={photoURL}
                     content={userName}
                  />
               </Card>
               <Menu
                  onClick={(e) => handleClick(e)}
                  style={{ width: 235, marginTop: 15 }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode='inline'
               >
                  <SubMenu
                     key='sub1'
                     icon={<UserOutlined />}
                     title='Account Management'
                  >
                     <Menu.ItemGroup key='g1' title='Change your Information'>
                        <Menu.Item key='1'>Account</Menu.Item>
                        <Menu.Item key='2'>Profile</Menu.Item>
                     </Menu.ItemGroup>
                  </SubMenu>
               </Menu>
            </>
         )}
      </>
   );
}

export default ProfileEditTree;
