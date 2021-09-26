import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import ProfileProductUser from '../../../Profile/components/ProfileProductUser';

CategoryContent.propTypes = {
   categoryProduct: PropTypes.array,
};

CategoryContent.defaultProps = {
   categoryProduct: [],
};

function CategoryContent(props) {
   const { categoryProduct } = props;
   return (
      <>
         <div>
            <Row gutter={[15, 15]}>
               {categoryProduct?.map((c) => (
                  <div key={c.id}>
                     <Col flex='none'>
                        <ProfileProductUser product={c} />
                     </Col>
                  </div>
               ))}
            </Row>
         </div>
      </>
   );
}

export default CategoryContent;
