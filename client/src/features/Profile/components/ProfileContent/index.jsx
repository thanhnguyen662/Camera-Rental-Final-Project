import React from 'react';
import PropTypes from 'prop-types';
import './ProfileContent.scss';
import ProfileProductUser from '../ProfileProductUser';
import { Col, Row } from 'antd';

ProfileContent.propTypes = {
   userProduct: PropTypes.array,
};

ProfileContent.defaultProps = {
   userProduct: [],
};

function ProfileContent(props) {
   const { userProduct } = props;

   return (
      <>
         <div>
            <Row gutter={[15, 20]}>
               {userProduct?.map((product) => (
                  <div key={product.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={product} />
                     </Col>
                  </div>
               ))}
            </Row>
         </div>
      </>
   );
}

export default ProfileContent;
