import { Col, Menu, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { BsBarChart, BsGrid, BsStar } from 'react-icons/bs';
import { useHistory } from 'react-router';
import './CategoryMenu.scss';

CategoryMenu.propTypes = {
   sortBy: PropTypes.string,
   categoryName: PropTypes.string,
   pagination: PropTypes.func,
};

CategoryMenu.defaultProps = {
   sortBy: '',
   categoryName: '',
   pagination: null,
};

function CategoryMenu(props) {
   const { sortBy, categoryName, pagination } = props;
   const history = useHistory();

   const onSelectMenuItem = (e) => {
      history.push(`/category/${categoryName}/${e.key}`);
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
               <Col>{pagination(true)}</Col>
            </Row>
         </div>
      </>
   );
}

export default CategoryMenu;
