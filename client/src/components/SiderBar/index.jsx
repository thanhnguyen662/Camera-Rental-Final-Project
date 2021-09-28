import {
   MessageOutlined,
   HeartOutlined,
   HomeOutlined,
   FileTextOutlined,
   InboxOutlined,
   ConsoleSqlOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BiMapPin } from 'react-icons/bi';

function SiderBar(props) {
   const location = useLocation();

   const { Sider } = Layout;
   const [collapsed, onCollapsed] = useState(true);
   const reduxIncomingMessage = useSelector((state) => state.messages[0]);
   const [badge, setBadge] = useState(false);

   useEffect(() => {
      reduxIncomingMessage && setBadge(true);
   }, [reduxIncomingMessage]);

   useEffect(() => {
      location.pathname === '/messageBeta' && setBadge(false);
   }, [location]);

   const badgeShow = location.pathname !== '/messageBeta' &&
      badge && {
         dot: true,
      };

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
            <Menu.Item key='3' icon={<HeartOutlined />} title='Social'>
               <Link to='/social'>Social</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<BiMapPin />} title='Maps'>
               <Link to='/maps'>Maps</Link>
            </Menu.Item>
            <Menu.Item
               key='4'
               icon={
                  <Badge {...badgeShow} size='small' offset={[5, 10]}>
                     <MessageOutlined style={{ color: '#9FA7AE' }} />
                  </Badge>
               }
               title='Message Beta'
            >
               <Link to='/messageBeta'>Message Beta</Link>
            </Menu.Item>
            {/* <Menu.Item
               key='5'
               icon={<FileTextOutlined />}
               title='Product Management'
            >
               <Link to='/product/manage'>Product Management</Link>
            </Menu.Item> */}
            <Menu.Item
               key='8'
               icon={<FileTextOutlined />}
               title='Product Management'
            >
               <Link to='/manages/user/pending'>Product Management</Link>
            </Menu.Item>
            {/* <Menu.Item key='6' icon={<InboxOutlined />} title='Shop Management'>
               <Link to='/manage'>Shop Management</Link>
            </Menu.Item> */}

            <Menu.Item key='7' icon={<InboxOutlined />} title='Shop Management'>
               <Link to='/manages/shop/revenue'>Shop Management</Link>
            </Menu.Item>
            <Menu.Item key='9' icon={<ConsoleSqlOutlined />} title='Admin'>
               <Link to='/admin'>Admin</Link>
            </Menu.Item>
         </Menu>
      </Sider>
   );
}

export default SiderBar;
