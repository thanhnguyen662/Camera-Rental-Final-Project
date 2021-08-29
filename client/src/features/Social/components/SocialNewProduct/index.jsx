import { Col, Image, Row, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
// import PropTypes from 'prop-types';
import './SocialNewProduct.scss';

SocialNewProduct.propTypes = {};

const { Title, Text } = Typography;

function SocialNewProduct(props) {
   const images = [
      {
         image: 'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2F968caaf0-f1bb-4928-9d81-cbd613284ee5.jpeg?alt=media&token=40430627-3154-40e4-9153-f46f6b0a2aa9',
         name: 'Canon 5D Mark IV',
      },
      {
         image: 'https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/products%2Ftest3%40gmail.com%2Fproduct%2Fb94212ac-8a84-41b7-a06b-9b0ff47e33d4.jpeg?alt=media&token=88c9c224-9848-4063-8e6a-22689656a81b',
         name: 'Canon EOS R5',
      },
   ];

   return (
      <div className='socialSuggestion'>
         <div className='socialNewProduct'>
            <Title level={5} className='title'>
               NEW PRODUCTS
            </Title>
            <Row span={24} gutter={[25, 20]}>
               {images.map((image) => (
                  <Col span={24} key={image.image}>
                     <div className='socialNewProductCard'>
                        <div className='socialNewProductUser'>
                           <Row>
                              <Col flex='auto'>
                                 <div className='productName'>
                                    <Text className='name'>{image.name}</Text>
                                 </div>
                                 <Space>
                                    <Avatar size={40} />
                                    <div>
                                       <Text className='username'>
                                          thanhnguyen662
                                       </Text>
                                       <Text className='address'>
                                          52 Thanh Thuy
                                       </Text>
                                    </div>
                                 </Space>
                              </Col>
                              <Col>
                                 <Image src={image.image} />
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
