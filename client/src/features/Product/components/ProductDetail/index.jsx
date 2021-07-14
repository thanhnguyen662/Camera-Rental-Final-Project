import {
   Button,
   Col,
   DatePicker,
   Image,
   Row,
   Avatar,
   Typography,
   Modal,
} from 'antd';
import { BiCheckCircle } from 'react-icons/bi';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './ProductDetail.scss';

ProductDetail.propTypes = {
   productDetail: PropTypes.object,
   onClickAddProduct: PropTypes.func,
};

ProductDetail.defaultProps = {
   productDetail: {},
   onClickAddProduct: null,
};

const { RangePicker } = DatePicker;
const { Paragraph } = Typography;

function ProductDetail(props) {
   const { productDetail, onClickToAddProduct } = props;
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [more, setMore] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);

   function onChange(dates, dateStrings) {
      if (!dates || !dateStrings) return;
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
   }

   const onClickAdd = (product) => {
      const destructuring = (product) => {
         const split = { ...product };
         split.startDate = startDate;
         split.endDate = endDate;

         return split;
      };

      onClickToAddProduct(destructuring(product));
   };

   return (
      <>
         <div className='productDetailCard'>
            <Row span={24} gutter={[45, 0]}>
               <Col span={11} className='rowImage'>
                  <Row span={24}>
                     <Col span={24}>
                        <div className='mainImage'>
                           <Image
                              className='image'
                              src={productDetail.productPhotoURL}
                              alt='photos'
                           />
                        </div>
                     </Col>
                     <Col span={24}>
                        <Row gutter={[20, 0]} justify='center'>
                           <Col span={8}>
                              <div className='rowImageDetail'></div>
                           </Col>
                           <Col span={8}>
                              <div className='rowImageDetail'></div>
                           </Col>
                           <Col span={8}>
                              <div className='rowImageDetail'></div>
                           </Col>
                        </Row>
                     </Col>
                  </Row>
               </Col>

               <Col span={13} className='product'>
                  <Row className='productHeaderRow'>
                     <h1>{productDetail.name}</h1>
                  </Row>
                  <Row span={24} className='productPriceRow'>
                     <p>$</p>
                     <h2>{productDetail.price}</h2>
                     <h3>in shipping + handling</h3>
                  </Row>
                  <div className='productDescriptionRow'>
                     <div className='productDescription'>
                        <Paragraph
                           className='description'
                           ellipsis={{
                              rows: 3,
                              onEllipsis: (ellipsis) => {
                                 setMore(ellipsis);
                                 console.log(ellipsis);
                              },
                           }}
                        >
                           {productDetail.description}
                        </Paragraph>

                        {more === true && (
                           <h5
                              className='readMore'
                              onClick={() => setIsModalVisible(true)}
                           >
                              more
                           </h5>
                        )}
                     </div>
                  </div>
                  <Row span={24} className='buttonRow'>
                     <RangePicker
                        className='datePicker'
                        ranges={{
                           Today: [moment(), moment()],
                           'This Month': [
                              moment().startOf('month'),
                              moment().endOf('month'),
                           ],
                        }}
                        showTime
                        format='YYYY/MM/DD HH:mm'
                        onChange={onChange}
                     />
                     <Button
                        className='addButton'
                        onClick={() => onClickAdd(productDetail)}
                     >
                        Add to Cart
                     </Button>
                  </Row>
                  <Row className='avatarGroup'>
                     <Avatar.Group maxCount={4}>
                        <Avatar src='https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png' />
                        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRauk54z0nlNc-2kfVl_qL7IE1VwgqEPMRoUizTrz6OSydMc-1Dk74Mo1mUJPg5AEwVdxE&usqp=CAU' />
                        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iTx6ZbhdE5ogFj14hHN8-MdAEYAZA8x35yQyO_MwY0m4nHDVeCOBc2e7_B50sryILJY&usqp=CAU' />
                        <Avatar src='https://i.pinimg.com/originals/72/cd/96/72cd969f8e21be3476277d12d44c791c.png' />
                        <Avatar src='https://img2.pngio.com/bearded-man-hipster-male-avatar-male-person-young-man-icon-male-person-icon-png-512_512.png' />
                        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6Uyi30Ty2WkMb0ZjuFLoXmkRwrrMObm-X2zztWtGbOgyA-i7mFzuiSKltN14HLAJDVM&usqp=CAU' />
                     </Avatar.Group>
                     <h4>11 other people tried it today</h4>
                  </Row>

                  <div className='productDescriptionInfo'>
                     <Row className='descriptionInfoRow'>
                        <Col flex='30px'>
                           <BiCheckCircle
                              style={{ fontSize: '20px', color: '#64C7A8' }}
                           />
                        </Col>
                        <Col>
                           <h4>Elit commodo duis.</h4>
                        </Col>
                     </Row>
                     <Row className='descriptionInfoRow'>
                        <Col flex='30px'>
                           <BiCheckCircle
                              style={{ fontSize: '20px', color: '#64C7A8' }}
                           />
                        </Col>
                        <Col>
                           <h4>Cillum et officia tempor.</h4>
                        </Col>
                     </Row>
                     <Row className='descriptionInfoRow'>
                        <Col flex='30px'>
                           <BiCheckCircle
                              style={{ fontSize: '20px', color: '#64C7A8' }}
                           />
                        </Col>
                        <Col>
                           <h4>Qui nisi commodo do.</h4>
                        </Col>
                     </Row>
                  </div>
               </Col>
            </Row>
         </div>
         <Modal
            title='Description'
            visible={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
         >
            <Paragraph>{productDetail.description}</Paragraph>
         </Modal>
      </>
   );
}

export default ProductDetail;
