import {
   AppstoreOutlined,
   MailOutlined,
   SearchOutlined,
} from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router';
import { Col, Menu, Row, Input } from 'antd';
import React from 'react';
import {
   BsGrid,
   BsFileArrowUp,
   BsHeart,
   BsClipboardData,
} from 'react-icons/bs';
import './ProfileSearchBar.scss';

ProfileSearchBar.propTypes = {};

function ProfileSearchBar(props) {
   const history = useHistory();
   const match = useRouteMatch();

   const handleOnSelect = (key) => {
      if (key === 'overview') return history.push(`${match.url}`);
      history.push(`${match.url}/${key}`);
   };

   const menuStyle = {
      marginBottom: -2.5,
      fontSize: 16,
   };

   return (
      <>
         <div className='profileSearchBar'>
            <Row justify='center' align='middle'>
               <Col span={18}>
                  <Menu
                     mode='horizontal'
                     className='menu'
                     onSelect={(e) => handleOnSelect(e.key)}
                     defaultSelectedKeys='overview'
                  >
                     <Menu.Item
                        key='overview'
                        icon={<BsClipboardData style={menuStyle} />}
                     >
                        Overview
                     </Menu.Item>
                     <Menu.Item
                        key='new'
                        icon={<BsFileArrowUp style={menuStyle} />}
                     >
                        New
                     </Menu.Item>
                     <Menu.Item key='top' icon={<BsHeart style={menuStyle} />}>
                        Top
                     </Menu.Item>
                     <Menu.Item key='all' icon={<BsGrid style={menuStyle} />}>
                        All
                     </Menu.Item>
                  </Menu>
               </Col>
               <Col span={6}>
                  <div className='input'>
                     <Input
                        suffix={<SearchOutlined />}
                        placeholder='Search here'
                     />
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default ProfileSearchBar;
