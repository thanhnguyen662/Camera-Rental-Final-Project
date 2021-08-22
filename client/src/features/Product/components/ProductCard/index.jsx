import { Col, Image, Rate, Row } from 'antd';
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

const colorStatus = (stock) => {
   console.log('stock', stock);
   if (stock >= 50)
      return {
         color: '#3eb88d',
      };
   if (stock < 50)
      return {
         color: '#F080B5',
      };
};

function ProductCard(props) {
   const { products } = props;

   return (
      <>
         <Row gutter={[35, 30]}>
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
                     <p>
                        <Link to={`/product/${product.slug}`}>
                           {product.name}
                        </Link>
                     </p>
                     <Rate
                        allowHalf
                        value={product.qualityRate}
                        style={{
                           fontSize: '14px',
                           color: 'rgb(255, 155, 61)',
                           marginLeft: '-5px',
                        }}
                     />
                     <h4>{product.qualityRate}</h4>
                     <h1>{priceFormat(product.price)}</h1>
                     <div style={colorStatus(product.stock)}>
                        <h5 style={colorStatus(product.stock)}>
                           {product.stock || 0}
                        </h5>
                        <h6 style={colorStatus(product.stock)}>in stock</h6>
                     </div>
                  </div>
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ProductCard;
