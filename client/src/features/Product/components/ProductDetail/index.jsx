import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import './ProductDetail.scss';
import { Row, Col, Button, DatePicker, Image, Avatar, Divider } from 'antd';
import { BiCheckShield, BiBulb, BiCloudSnow } from 'react-icons/bi';
import userApi from '../../../../api/userApi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import conversationApi from '../../../../api/conversationApi';

ProductDetail.propTypes = {
   productDetail: PropTypes.object,
};

ProductDetail.defaultProps = {
   productDetail: {},
};

const { RangePicker } = DatePicker;

function ProductDetail(props) {
   const { productDetail } = props;
   const [userProductInfo, setUserProductInfo] = useState('');
   const userId = useSelector((state) => state.users.id);

   function onChange(dates, dateStrings) {
      if (!dates || !dateStrings) return;
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
   }

   useEffect(() => {
      const getInfoByFirebaseId = async () => {
         try {
            if (!productDetail?.firebaseId) return;
            const response = await userApi.getMe({
               uid: productDetail?.firebaseId,
            });
            setUserProductInfo(response);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getInfoByFirebaseId();
   }, [productDetail?.firebaseId]);

   const onClickSendMessage = async () => {
      try {
         if (!userId || !productDetail) return console.log('WAIT FOR REDUX');
         const formValues = {
            senderId: userId,
            receiverId: productDetail?.firebaseId,
         };
         const response = await conversationApi.createConversation(formValues);
         console.log('Conversation created: ', response);

         localStorage.setItem('selectedConversation', JSON.stringify(response));
         window.location = '/message';
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <>
         {/* <BreadcrumbBar productName={productDetail} /> */}
         <div className='productDetailCard'>
            <Row span={24} gutter={[45, 0]}>
               <Col span={12} className='rowImage'>
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
               <Col span={12} className='product'>
                  <h2>
                     <p>BY</p>
                     {userProductInfo.email}
                  </h2>
                  <h1>{productDetail.name}</h1>
                  <h5>The One and Only</h5>
                  <div className='productDetail'>
                     <h2>${productDetail.price}</h2>
                     <h6>
                        Sit nisi ipsum qui veniam culpa exercitation laborum.
                     </h6>
                  </div>
                  <div className='productDescriptionInfo'>
                     <Row className='descriptionInfoRow'>
                        <Col flex='20px'>
                           <BiCheckShield
                              style={{ fontSize: '20px', color: '#7e8996' }}
                           />
                        </Col>
                        <Col>
                           <h4>Elit commodo duis.</h4>
                        </Col>
                     </Row>
                     <Row className='descriptionInfoRow'>
                        <Col flex='20px'>
                           <BiBulb
                              style={{ fontSize: '20px', color: '#7e8996' }}
                           />
                        </Col>
                        <Col>
                           <h4>Cillum et officia tempor.</h4>
                        </Col>
                     </Row>
                     <Row className='descriptionInfoRow'>
                        <Col flex='20px'>
                           <BiCloudSnow
                              style={{ fontSize: '20px', color: '#7e8996' }}
                           />
                        </Col>
                        <Col>
                           <h4>Qui nisi commodo do.</h4>
                        </Col>
                     </Row>
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
                     <Button className='addButton'>Add to Cart</Button>
                  </Row>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default ProductDetail;
