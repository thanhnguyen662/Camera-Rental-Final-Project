import { Col, Image, Progress, Rate, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

ProductCard.propTypes = {
   products: PropTypes.array,
   onClickToAddProduct: PropTypes.func,
};

ProductCard.defaultProps = {
   products: [],
   onClickToAddProduct: null,
};

function ProductCard(props) {
   const { products, onClickToAddProduct } = props;

   return (
      <>
         <Row gutter={[30, 30]} justify='center'>
            {products.map((product) => (
               <Col flex='none' key={product.id}>
                  <div className='productCard'>
                     <Row span={24}>
                        <div className='productImage'>
                           <Image
                              style={{ objectFit: 'cover' }}
                              height={150}
                              width={166}
                              src={product.productPhotoURL}
                           ></Image>
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
                        style={{ marginLeft: '-2px', fontSize: '14px' }}
                     />
                     <h4>{product.qualityRate}</h4>
                     <h1>${product.price}</h1>
                     <div className='stockStatus'>
                        <Progress
                           style={{ width: '30%' }}
                           percent={product.stock}
                           showInfo={false}
                           size='small'
                           status='active'
                        />
                        <h5 onClick={() => onClickToAddProduct(product)}>
                           {product.stock} in Stock
                        </h5>
                     </div>
                  </div>
               </Col>
            ))}
         </Row>
      </>
   );
}

export default ProductCard;
