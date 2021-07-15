import { Col, Image, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './ProductDetailImage.scss';

ProductDetailImage.propTypes = {
   productDetail: PropTypes.object,
};

ProductDetailImage.defaultProps = {
   productDetail: {},
};

function ProductDetailImage(props) {
   const { productDetail } = props;
   const [imageArray, setImageArray] = useState([]);

   useEffect(() => {
      if (!productDetail.productPhotoURL) return;
      setImageArray(productDetail?.productPhotoURL[0]);
   }, [productDetail.productPhotoURL]);

   const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
   };

   return (
      <>
         <Row span={24}>
            <Col span={24}>
               <div className='mainImage'>
                  {!productDetail.productPhotoURL ? (
                     <Spin />
                  ) : (
                     <Image className='image' src={imageArray} />
                  )}
               </div>
            </Col>
            <Col span={24}>
               <Slider
                  {...settings}
                  style={{ width: '530px', height: '158px' }}
               >
                  {productDetail.productPhotoURL?.map((product) => (
                     <div key={productDetail.productPhotoURL.indexOf(product)}>
                        {product === imageArray ? (
                           <div className='rowImageDetailHighlight'>
                              <img
                                 onClick={() => setImageArray(product)}
                                 alt='photos'
                                 src={product}
                              />
                           </div>
                        ) : (
                           <div className='rowImageDetail'>
                              <img
                                 onClick={() => setImageArray(product)}
                                 alt='photos'
                                 src={product}
                              />
                           </div>
                        )}
                     </div>
                  ))}
               </Slider>
            </Col>
         </Row>
      </>
   );
}

export default ProductDetailImage;
