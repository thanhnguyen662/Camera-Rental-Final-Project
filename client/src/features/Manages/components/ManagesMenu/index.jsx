import {
   FundOutlined,
   LaptopOutlined,
   NotificationOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

const { SubMenu } = Menu;

function ManagesMenu(props) {
   const history = useHistory();

   const handleOnClickMenuItem = (path) => {
      history.push(`/manages/shop/${path.key}`);
   };

   return (
      <>
         <Menu
            className='manageShopMenuSider'
            mode='inline'
            defaultSelectedKeys={['revenue']}
            defaultOpenKeys={['sub1', 'sub2']}
            onClick={handleOnClickMenuItem}
         >
            <Menu.Item key='revenue' icon={<FundOutlined />}>
               Overview
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='Manage Product'>
               <Menu.Item key='product'>All Product</Menu.Item>
               <Menu.Item key='publication'>Publication</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<LaptopOutlined />} title='Manage Order'>
               <Menu.Item key='pending'>Pending Order</Menu.Item>
               <Menu.Item key='accept'>Accept Order</Menu.Item>
               <Menu.Item key='rented'>Rented Order</Menu.Item>
               <Menu.Item key='back'>Back Order</Menu.Item>
               <Menu.Item key='failure'>Failure Order</Menu.Item>
            </SubMenu>
            <SubMenu
               key='sub3'
               icon={<NotificationOutlined />}
               title='subnav 3'
            >
               <Menu.Item key='9'>option9</Menu.Item>
               <Menu.Item key='10'>option10</Menu.Item>
               <Menu.Item key='11'>option11</Menu.Item>
               <Menu.Item key='12'>option12</Menu.Item>
            </SubMenu>
         </Menu>
      </>
   );
}

export default ManagesMenu;
