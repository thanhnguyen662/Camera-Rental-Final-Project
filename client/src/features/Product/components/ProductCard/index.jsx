import { Col, Image, Rate, Row, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import './ProductCard.scss';

ProductCard.propTypes = {
   products: PropTypes.array,
};

ProductCard.defaultProps = {
   products: [],
};

const { Text } = Typography;

const colorStatus = (stock) => {
   if (stock > 60)
      return {
         color: '#3eb88d',
      };
   if (stock >= 30 && stock <= 65) {
      return {
         color: '#FFB571',
      };
   }
   if (stock < 30)
      return {
         color: '#F080B5',
      };
};

function ProductCard(props) {
   const { products } = props;

   return (
      <>
         <Row gutter={[35, 35]}>
            {products.map((product) => (
               <Col flex='none' key={product.id}>
                  <div className='productCard'>
                     <Row span={24} style={{ align: 'center' }}>
                        <div className='productImage'>
                           <Image
                              style={{ objectFit: 'cover' }}
                              height={150}
                              width={150}
                              src={product.productPhotoURL[0]}
                           />
                        </div>
                     </Row>
                     <h3>{product.brand}</h3>
                     <div style={{ width: 132, height: 47 }}>
                        <p>
                           <Link to={`/product/${product.slug}`}>
                              {product.name}
                           </Link>
                        </p>
                     </div>
                     <Space align='end' size={0}>
                        <Rate
                           allowHalf
                           value={product.qualityRate}
                           style={{
                              fontSize: '14px',
                              color: 'rgb(255, 155, 61)',
                              marginBottom: '2px',
                           }}
                        />
                        <Text className='qualityRate'>
                           {product.qualityRate}
                        </Text>
                     </Space>
                     <Text className='productPrice'>
                        {priceFormat(product.price)}
                     </Text>
                     <div style={colorStatus(product.stock)}>
                        <h5 style={colorStatus(product.stock)}>
                           {product.stock || 0}
                        </h5>
                        <h6 style={colorStatus(product.stock)}>
                           in stock, {product.completed} rented
                        </h6>
                     </div>
                  </div>
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ProductCard;
