import React from 'react';
import PropTypes from 'prop-types';
import './ManageShopMenu.scss';
import {
   UserOutlined,
   LaptopOutlined,
   NotificationOutlined,
   FundOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

ManageShopMenu.propTypes = {
   handleCurrentMenuChange: PropTypes.func,
};

ManageShopMenu.defaultProps = {
   handleCurrentMenuChange: null,
};

const { SubMenu } = Menu;

function ManageShopMenu(props) {
   const { handleCurrentMenuChange } = props;

   return (
      <>
         <Menu
            className='manageShopMenuSider'
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2']}
            onClick={(value) => handleCurrentMenuChange(value.key)}
         >
            <Menu.Item key='overview' icon={<FundOutlined />}>
               Overview
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='Manage Product'>
               <Menu.Item key='allProduct'>All Product</Menu.Item>
               <Menu.Item key='publication'>Publication</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<LaptopOutlined />} title='Manage Order'>
               <Menu.Item key='ALL'>All Order</Menu.Item>
               <Menu.Item key='PENDING'>Pending Order</Menu.Item>
               <Menu.Item key='ACCEPT'>Accept Order</Menu.Item>
               <Menu.Item key='RENTED'>Rented Order</Menu.Item>
               <Menu.Item key='BACK'>Back Order</Menu.Item>
               <Menu.Item key='FAILURE'>Failure Order</Menu.Item>
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

export default ManageShopMenu;
