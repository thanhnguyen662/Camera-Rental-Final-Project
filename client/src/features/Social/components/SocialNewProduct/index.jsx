import { Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './SocialNewProduct.scss';

SocialNewProduct.propTypes = {
   newProduct: PropTypes.array,
};

SocialNewProduct.defaultProps = {
   newProduct: [],
};

const { Title, Text } = Typography;

function SocialNewProduct(props) {
   const { newProduct } = props;

   return (
      <div className='socialSuggestion'>
         <div className='socialNewProduct'>
            <Title level={5} className='title'>
               NEW PRODUCTS
            </Title>
            <Row span={24} gutter={[25, 20]}>
               {newProduct?.map((product) => (
                  <Col span={24} key={product.id}>
                     <div className='socialNewProductCard'>
                        <div className='socialNewProductUser'>
                           <Row>
                              <Col flex='auto'>
                                 <div className='productName'>
                                    <Text className='name'>{product.name}</Text>
                                 </div>
                                 <Space>
                                    <img
                                       style={{ width: 40, height: 40 }}
                                       src={product.User.photoURL}
                                       alt='photos'
                                    />
                                    <div>
                                       <Text className='username'>
                                          {product.User.username}
                                       </Text>
                                       <Text className='address'>
                                          {product.User.address}
                                       </Text>
                                    </div>
                                 </Space>
                              </Col>
                              <Col>
                                 <Image src={product.productPhotoURL[0]} />
                              </Col>
                           </Row>
                        </div>
                     </div>
                  </Col>
               ))}
            </Row>
         </div>
      </div>
   );
}

export default SocialNewProduct;
