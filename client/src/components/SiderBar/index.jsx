import {
   MessageOutlined,
   HeartOutlined,
   HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

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
               <Link to='/lading'>Social</Link>
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
         </Menu>
      </Sider>
   );
}

export default SiderBar;
