import { Col, Image, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './NewProduct.scss';

NewProduct.propTypes = {
   newProduct: PropTypes.array,
};

NewProduct.defaultProps = {
   newProduct: [],
};

const { Text } = Typography;

function NewProduct(props) {
   const { newProduct } = props;

   const settings = {
      dots: false,
      arrows: false,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px 0px -120px',
      slidesToShow: 3,
      speed: 1000,
      slidesPerRow: 1,
      autoplay: true,
   };

   return (
      <>
         <div className='newProductGrid'>
            <Row span={24} gutter={[25, 20]}>
               <Col span={6}>
                  <div>
                     <Slider
                        {...settings}
                        style={{
                           overflow: 'hidden',
                           height: 570,
                           borderRadius: 10,
                        }}
                     >
                        {newProduct?.map((p) => (
                           <div className='col1' key={p.id}>
                              <Link to={`/product/${p.slug}`}>
                                 <div
                                    className='productCol1-1'
                                    style={{ height: 272 }}
                                 >
                                    <Image
                                       src={p.productPhotoURL[0]}
                                       preview={false}
                                       width={150}
                                       height={150}
                                       style={{
                                          borderRadius: 7,
                                          objectFit: 'cover',
                                       }}
                                    />
                                    <div className='productGirdParaGraph'>
                                       <Text className='productText'>
                                          {p.name}
                                       </Text>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        ))}
                     </Slider>
                  </div>
               </Col>
               <Col span={6}>
                  <div>
                     <Slider
                        {...settings}
                        style={{
                           overflow: 'hidden',
                           height: 570,
                           borderRadius: 10,
                        }}
                     >
                        {newProduct?.map((p) => (
                           <div className='col1' key={p.id}>
                              <Link to={`/product/${p.slug}`}>
                                 <div
                                    className='productCol1-1'
                                    style={{ height: 180 }}
                                 >
                                    <Image
                                       src={p.productPhotoURL[0]}
                                       preview={false}
                                       width={120}
                                       height={120}
                                       style={{
                                          borderRadius: 7,
                                          objectFit: 'cover',
                                       }}
                                    />
                                    <div className='productGirdParaGraph'>
                                       <Text className='productText'>
                                          {p.name}
                                       </Text>
                                    </div>
                                 </div>
                              </Link>
                           </div>
                        ))}
                     </Slider>
                  </div>
               </Col>
               <Col span={6}>
                  <div>
                     <Slider
                        {...settings}
                        style={{
                           overflow: 'hidden',
                           height: 570,
                           borderRadius: 10,
                        }}
                     >
                        {newProduct?.map((p) => (
                           <div className='col1' key={p.id}>
                              <div
                                 className='productCol1-1'
                                 style={{ height: 230 }}
                              >
                                 <Link to={`/product/${p.slug}`}>
                                    <Image
                                       src={p.productPhotoURL[0]}
                                       preview={false}
                                       width={160}
                                       height={160}
                                       style={{
                                          borderRadius: 7,
                                          objectFit: 'cover',
                                       }}
                                    />
                                    <div className='productGirdParaGraph'>
                                       <Text className='productText'>
                                          {p.name}
                                       </Text>
                                    </div>
                                 </Link>
                              </div>
                           </div>
                        ))}
                     </Slider>
                  </div>
               </Col>
               <Col span={6}>
                  <div>
                     <Slider
                        {...settings}
                        style={{
                           overflow: 'hidden',
                           height: 570,
                           borderRadius: 10,
                        }}
                     >
                        {newProduct?.map((p) => (
                           <div className='col1' key={p.id}>
                              <div
                                 className='productCol1-1'
                                 style={{ height: 272 }}
                              >
                                 <Link to={`/product/${p.slug}`}>
                                    <Image
                                       src={p.productPhotoURL[0]}
                                       preview={false}
                                       width={150}
                                       height={150}
                                       style={{
                                          borderRadius: 7,
                                          objectFit: 'cover',
                                       }}
                                    />
                                    <div className='productGirdParaGraph'>
                                       <Text className='productText'>
                                          {p.name}
                                       </Text>
                                    </div>
                                 </Link>
                              </div>
                           </div>
                        ))}
                     </Slider>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default NewProduct;
