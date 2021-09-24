import { Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
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

const images = {
   image1:
      'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2F968caaf0-f1bb-4928-9d81-cbd613284ee5.jpeg?alt=media&token=40430627-3154-40e4-9153-f46f6b0a2aa9',
   image2:
      'https://cdn.vjshop.vn/thiet-bi-lam-video/gimbal/zhiyun/gimbal-chong-rung-zhiyun-crane-2-tich-hop-cong-nghe-follow-focus/gimbal-zhiyun-crane-2-5-500x500.jpg',
   image3:
      'https://cdn.vjshop.vn/flycam/dji/dji-mini-se/dji-mini-se-6-500x500.jpg',
   image4:
      'https://cdn.vjshop.vn/thiet-bi-lam-video/den/nanlite/den-led-quay-phim-nanlite-forza-60/300w/den-led-nanlite-forza-300-500x500.jpg',
   image5:
      'https://cdn.vjshop.vn/thiet-bi-lam-video/microphone/rode-videomic-pro/microphone-rode-videomic-pro-1-500x500.jpg',
   image6:
      'https://cdn.vjshop.vn/may-quay-phim/canon/canon-xa45/canon-xa45-1-500x500.jpeg',
   image7:
      'https://cdn.vjshop.vn/may-anh/mirrorless/fujifilm/fujifilm-gfx-100/fujifilm-gfx-100-chinh-hang2-500x500.jpg',
};

const { Text } = Typography;

function NewProduct(props) {
   const { newProduct } = props;

   const settings = {
      dots: false,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px 0px -120px',
      slidesToShow: 3,
      speed: 500,
      slidesPerRow: 1,
   };

   return (
      <>
         <div className='newProductGrid'>
            <Row span={24} gutter={[35, 20]}>
               <Col span={6}>
                  <div>
                     <Slider
                        {...settings}
                        style={{
                           overflow: 'hidden',
                           height: 745,
                           borderRadius: 10,
                        }}
                     >
                        {newProduct?.map((p) => (
                           <div className='col1' key={p.id}>
                              <div className='productCol1-1'>
                                 <Image
                                    src={p.productPhotoURL[0]}
                                    preview={false}
                                    width={150}
                                    height={150}
                                 />
                                 <div
                                    style={{
                                       width: 150,
                                       marginTop: 20,
                                       textAlign: 'center',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                    }}
                                 >
                                    <Text
                                       strong
                                       style={{
                                          color: '#301f71',
                                          fontSize: 16,
                                       }}
                                    >
                                       {p.name}
                                    </Text>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </Slider>
                  </div>
               </Col>
            </Row>
         </div>

         {/* <div className='newProductGrid'>
            <Row span={24} gutter={[35, 20]}>
               <Col span={8}>
                  <div className='col1'>
                     <Space direction='vertical' size={35}>
                        <div className='productCol1-1'>
                           <Image
                              src={newProduct[0]?.productPhotoURL[0]}
                              preview={false}
                              width={190}
                              height={190}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>
                                 {newProduct[0]?.name}
                              </Text>
                           </div>
                        </div>
                        <div className='productCol1-2'>
                           <Image
                              src={newProduct[1]?.productPhotoURL[0]}
                              preview={false}
                              width={250}
                              height={250}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>
                                 {newProduct[1]?.name}
                              </Text>
                           </div>
                        </div>
                     </Space>
                  </div>
               </Col>
               <Col span={8}>
                  <div className='col2'>
                     <Space direction='vertical' size={32}>
                        <div className='productCol2-1'>
                           <Image
                              src={newProduct[2]?.productPhotoURL[0]}
                              preview={false}
                              width={200}
                              height={130}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>
                                 {newProduct[2]?.name}
                              </Text>
                           </div>
                        </div>
                        <div className='productCol2-2'>
                           <Image
                              src={newProduct[3]?.productPhotoURL[0]}
                              preview={false}
                              width={170}
                              height={170}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>
                                 {newProduct[3]?.name}
                              </Text>
                           </div>
                        </div>
                        <div className='productCol2-3'>
                           <Image
                              src={newProduct[4]?.productPhotoURL[0]}
                              preview={false}
                              width={220}
                              height={95}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>
                                 {newProduct[4]?.name}
                              </Text>
                           </div>
                        </div>
                     </Space>
                  </div>
               </Col>
               <Col span={8}>
                  <div className='col3'>
                     <Space direction='vertical' size={35}>
                        <div className='productCol3-1'>
                           <Image
                              src={images.image6}
                              preview={false}
                              width={200}
                              height={200}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>Canon XA45</Text>
                           </div>
                        </div>
                        <div className='productCol3-2'>
                           <Image
                              src={images.image7}
                              preview={false}
                              width={180}
                              height={180}
                           />
                           <div className='productGirdParaGraph'>
                              <Text className='productText'>
                                 Fujifilm GFX 100
                              </Text>
                           </div>
                        </div>
                     </Space>
                  </div>
               </Col>
            </Row>
         </div> */}
      </>
   );
}

export default NewProduct;
