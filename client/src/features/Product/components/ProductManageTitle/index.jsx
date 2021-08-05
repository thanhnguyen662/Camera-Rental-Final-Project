import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './ProductManageTitle.scss';

ProductManageTitle.propTypes = {
   handleClickTitle: PropTypes.func,
};

ProductManageTitle.defaultProps = {
   handleClickTitle: null,
};

const { SubMenu } = Menu;

function ProductManageTitle(props) {
   const { handleClickTitle } = props;
   return (
      <Menu
         onClick={(e) => handleClickTitle(parseInt(e.key))}
         defaultSelectedKeys={['0']}
         defaultOpenKeys={['sub1']}
         mode='inline'
         theme='light'
         className='productManageTitle'
      >
         <SubMenu key='sub1' icon={<SettingOutlined />} title='Manage Order'>
            <Menu.ItemGroup key='g1' title='Status'>
               <Menu.Item key={0}>All</Menu.Item>
               <Menu.Item key={1}>Pending</Menu.Item>
               <Menu.Item key={2}>Delivery</Menu.Item>
               <Menu.Item key={3}>Success</Menu.Item>
               <Menu.Item key={4}>Failure</Menu.Item>
            </Menu.ItemGroup>
         </SubMenu>
         <SubMenu
            key='sub2'
            icon={<SettingOutlined />}
            title='My Product Order'
         >
            <Menu.Item key={5}>All</Menu.Item>
            <Menu.Item key={6}>Pending</Menu.Item>
            <Menu.Item key={7}>Success</Menu.Item>
            <Menu.Item key={8}>Failure</Menu.Item>
         </SubMenu>
      </Menu>
   );
}

export default ProductManageTitle;
