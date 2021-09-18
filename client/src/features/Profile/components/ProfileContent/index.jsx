import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
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

function ProfileContent(props) {
   const {
      newUserProduct,
      topUserProduct,
      allUserProduct,
      handleShowMoreAllProduct,
      showButton,
   } = props;

   return (
      <>
         <div className='profileContent'>
            <h1 className='title'>New Product</h1>
            <Row gutter={[17, 17]}>
               {newUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            <h1 className='title'>Top Renting</h1>
            <Row gutter={[17, 17]}>
               {topUserProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
            <h1 className='title'>All Product</h1>
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
