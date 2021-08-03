import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
// import PropTypes from 'prop-types';
import './ProductManageTitle.scss';

ProductManageTitle.propTypes = {};

const { SubMenu } = Menu;

function ProductManageTitle(props) {
   return (
      <Menu
         defaultSelectedKeys={['1']}
         defaultOpenKeys={['sub2']}
         mode='inline'
         theme='light'
         className='productManageTitle'
      >
         <SubMenu
            key='sub2'
            icon={<SettingOutlined />}
            title='Navigation Three'
         >
            <Menu.Item key='7'>Option 7</Menu.Item>
            <Menu.Item key='8'>Option 8</Menu.Item>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
         </SubMenu>
      </Menu>
   );
}

export default ProductManageTitle;
