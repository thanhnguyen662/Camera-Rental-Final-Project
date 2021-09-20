import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import ProfileProductUser from '../ProfileProductUser';
import './ProfileContent.scss';

ProfileContent.propTypes = {
   newUserProduct: PropTypes.array,
   topUserProduct: PropTypes.array,
   allUserProduct: PropTypes.array,
   handleShowMoreAllProduct: PropTypes.func,
   showButton: PropTypes.bool,
};

ProfileContent.defaultProps = {
   newUserProduct: [],
   topUserProduct: [],
   allUserProduct: [],
   handleShowMoreAllProduct: null,
   showButton: true,
};

const { Text } = Typography;

function ProfileContent(props) {
   const {
      newUserProduct,
      topUserProduct,
      allUserProduct,
      handleShowMoreAllProduct,
      showButton,
   } = props;
   const history = useHistory();
   const match = useRouteMatch();

   const onClickTitle = (title) => {
      return history.push(`${match.url}/${title}`);
   };

   return (
      <>
         <div className='profileContent'>
            <div className='titleOfTab' onClick={() => onClickTitle('new')}>
               <Space>
                  <Text className='title'>New Product</Text>
                  <RightOutlined className='icon' />
               </Space>
            </div>
            <Row gutter={[17, 17]}>
               {newUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            <div className='titleOfTab' onClick={() => onClickTitle('top')}>
               <Space>
                  <Text className='title'>Top Renting</Text>
                  <RightOutlined className='icon' />
               </Space>
            </div>
            <Row gutter={[17, 17]}>
               {topUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            <div className='titleOfTab' onClick={() => onClickTitle('all')}>
               <Space>
                  <Text className='title'>All Product</Text>
                  <RightOutlined className='icon' />
               </Space>
            </div>
            <Row gutter={[17, 17]}>
               {allUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            <div className='showMoreButton'>
               {showButton && (
                  <Button onClick={() => handleShowMoreAllProduct()}>
                     Show More
                  </Button>
               )}
            </div>
         </div>
      </>
   );
}

export default ProfileContent;
