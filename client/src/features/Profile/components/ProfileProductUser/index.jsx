import { Image, Rate, Row, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import './ProfileProductUser.scss';

ProfileProductUser.propTypes = {
   product: PropTypes.object,
};

ProfileProductUser.defaultProps = {
   product: {},
};

const { Text } = Typography;

function ProfileProductUser(props) {
   const { product } = props;

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

   return (
      <>
         <div className='profileProductCard'>
            <Row span={24} justify='center'>
               <div className='productImage'>
                  <Image
                     style={{ objectFit: 'cover' }}
                     height={115}
                     width={115}
                     src={product.productPhotoURL[0]}
                  />
               </div>
            </Row>
            <h3>{product.brand}</h3>
            <div style={{ width: 130, height: 38 }}>
               <p>
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
               </p>
            </div>
            <Space size={2} align='end'>
               <Rate
                  allowHalf
                  value={product.qualityRate}
                  style={{
                     fontSize: '12px',
                     color: 'rgb(255, 155, 61)',
                     marginBottom: '1px',
                  }}
               />
               <Text className='rateNumber'>{product.qualityRate || 0}</Text>
            </Space>
            <Text className='productPrice'>{priceFormat(product.price)}</Text>
            <div style={colorStatus(product.stock)}>
               <h5 style={colorStatus(product.stock)}>{product.stock || 0}</h5>
               <h6 style={colorStatus(product.stock)}>
                  in stock, {product.completed} rented
               </h6>
            </div>
         </div>
      </>
   );
}

export default ProfileProductUser;
