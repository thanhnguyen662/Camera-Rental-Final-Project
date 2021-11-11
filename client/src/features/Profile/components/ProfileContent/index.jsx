import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Row, Space, Typography } from 'antd';
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
            {newUserProduct?.length > 0 && (
               <div className='titleOfTab' onClick={() => onClickTitle('new')}>
                  <Space>
                     <Text className='title'>New Product</Text>
                     <RightOutlined className='icon' />
                  </Space>
               </div>
            )}
            <Row gutter={[20, 20]}>
               {newUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            {topUserProduct?.length > 0 && (
               <div className='titleOfTab' onClick={() => onClickTitle('top')}>
                  <Space>
                     <Text className='title'>Top Renting</Text>
                     <RightOutlined className='icon' />
                  </Space>
               </div>
            )}
            <Row gutter={[20, 20]}>
               {topUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            {allUserProduct?.length > 0 && (
               <div className='titleOfTab' onClick={() => onClickTitle('all')}>
                  <Space>
                     <Text className='title'>All Product</Text>
                     <RightOutlined className='icon' />
                  </Space>
               </div>
            )}
            <Row gutter={[20, 20]}>
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
            {newUserProduct?.length <= 0 &&
               topUserProduct?.length <= 0 &&
               allUserProduct?.length <= 0 && (
                  <div
                     style={{
                        background: 'white',
                        borderRadius: 10,
                        marginTop: 15,
                        padding: '12px 0',
                     }}
                  >
                     <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={<span>You dont have any product</span>}
                     >
                        <Button
                           style={{ borderRadius: 8 }}
                           onClick={() => history.push('/product/create')}
                        >
                           Create Now
                        </Button>
                     </Empty>
                  </div>
               )}
         </div>
      </>
   );
}

export default ProfileContent;
