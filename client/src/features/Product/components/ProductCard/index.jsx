import { Col, Image, Progress, Rate, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

ProductCard.propTypes = {
   products: PropTypes.array,
};

ProductCard.defaultProps = {
   products: [],
};

function ProductCard(props) {
   const { products } = props;

   return (
      <>
         <h1 style={{ marginTop: '45px' }}>Recent Discounts</h1>
         <Row gutter={[30, 30]}>
            {products.map((product) => (
               <Col flex='none' key={product.id}>
                  <div className='productCard'>
                     <Row span={24}>
                        <div className='productImage'>
                           <Image
                              style={{ objectFit: 'cover' }}
                              height={150}
                              width={165}
                              src={product.productPhotoURL[0]}
                           />
                        </div>
                     </Row>
                     <h3>{product.brand}</h3>
                     <p>
                        <Link to={`/product/${product.slug}`}>
                           {product.name}
                        </Link>
                     </p>
                     <Rate
                        value={product.qualityRate}
                        style={{
                           fontSize: '14px',
                           color: 'rgb(255, 155, 61)',
                           marginLeft: '-5px',
                        }}
                     />
                     <h4>{product.qualityRate}</h4>
                     <h1>${product.price}</h1>
                     <div className='stockStatus'>
                        <Progress
                           className='progressBar'
                           strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                           }}
                           percent={product.stock || 0}
                           showInfo={false}
                           size='small'
                        />
                        <h5>{product.stock || 0}%</h5>
                        <h6>in stock</h6>
                     </div>
                  </div>
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ProductCard;
