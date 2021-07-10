import {
   MessageOutlined,
   HeartOutlined,
   // FileOutlined,
   HomeOutlined,
   // TeamOutlined,
   // UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SiderBar(props) {
   // const { SubMenu } = Menu;
   const { Sider } = Layout;
   const [collapsed, onCollapsed] = useState(true);

   return (
      <Sider
         collapsible
         collapsed={collapsed}
         theme='dark'
         onCollapse={onCollapsed}
      >
         <div className='logo' />
         <Menu theme='dark' mode='inline'>
            <Menu.Item key='1' icon={<HomeOutlined />} title='Home'>
               <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<MessageOutlined />} title='Messenger'>
               <a href='http://localhost:3000/message'>Messenger</a>
            </Menu.Item>
            <Menu.Item key='3' icon={<HeartOutlined />} title='Social'>
               <Link to='/lading'>Social</Link>
            </Menu.Item>
            {/* <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
               <Menu.Item key='3'>Tom</Menu.Item>
               <Menu.Item key='4'>Bill</Menu.Item>
               <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
               <Menu.Item key='6'>Team 1</Menu.Item>
               <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />}>
               Files
            </Menu.Item> */}
         </Menu>
      </Sider>
   );
}

export default SiderBar;
