import { Col, Menu, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { BsBarChart, BsGrid, BsStar } from 'react-icons/bs';
import './CategoryMenu.scss';

CategoryMenu.propTypes = {
   sortBy: PropTypes.string,
   handleSelectedMenuItem: PropTypes.func,
   pagination: PropTypes.func,
};

CategoryMenu.defaultProps = {
   sortBy: '',
   handleSelectedMenuItem: null,
   pagination: null,
};

function CategoryMenu(props) {
   const { sortBy, pagination, handleSelectedMenuItem } = props;

   const onSelectMenuItem = (e) => {
      handleSelectedMenuItem(e.key);
   };

   return (
      <>
         <div className='categoryMenu'>
            <Row justify='center' align='middle'>
               <Col flex='auto'>
                  <Menu
                     mode='horizontal'
                     className='menu'
                     selectedKeys={[sortBy]}
                     onSelect={(e) => onSelectMenuItem(e)}
                  >
                     <Menu.Item key='all' icon={<BsGrid />}>
                        All
                     </Menu.Item>
                     <Menu.Item key='popular' icon={<BsBarChart />}>
                        Popular
                     </Menu.Item>
                     <Menu.Item key='newest' icon={<BsStar />}>
                        Newest
                     </Menu.Item>
                  </Menu>
               </Col>
               <Col>
                  <div style={{ marginRight: 10 }}>{pagination(true)}</div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default CategoryMenu;
