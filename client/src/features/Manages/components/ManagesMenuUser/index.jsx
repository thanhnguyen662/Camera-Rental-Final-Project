import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import './ManagesMenuUser.scss';

const { SubMenu } = Menu;

function ManagesMenuUser(props) {
   const history = useHistory();

   const handleOnClickMenuItem = (path) => {
      history.push(`/manages/user/${path.key}`);
   };

   return (
      <>
         <div>
            <Menu
               onClick={handleOnClickMenuItem}
               defaultSelectedKeys={['0']}
               defaultOpenKeys={['sub1']}
               mode='inline'
               theme='light'
               className='manageUserOrderMenu'
            >
               <SubMenu
                  key='sub1'
                  icon={<SettingOutlined />}
                  title='Manage Order'
               >
                  <Menu.ItemGroup key='g1' title='Status'>
                     <Menu.Item key='pending'>Pending</Menu.Item>
                     <Menu.Item key='accept'>Accept</Menu.Item>
                     <Menu.Item key='rented'>Rented</Menu.Item>
                     <Menu.Item key='back'>Back</Menu.Item>
                     <Menu.Item key='failure'>Failure</Menu.Item>
                  </Menu.ItemGroup>
               </SubMenu>
            </Menu>
         </div>
      </>
   );
}

export default ManagesMenuUser;
