import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import './ProductDetail.scss';
import { Row, Col, Button, DatePicker } from 'antd';
import userApi from '../../../../api/userApi';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

   return (
      <>
         {/* <BreadcrumbBar productName={productDetail} /> */}
         <div className='productDetailCard'>
            <Row span={24} gutter={[45, 0]}>
               <Col span={11} className='rowImage'>
                  <Row span={24}>
                     <Col span={24}>
                        <div className='mainImage'>
                           <img
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
               <Col span={13} className='test'>
                  <h1>{productDetail.name}</h1>
                  <h2>
                     <p>BY</p>
                     <Link to={`/profile/${productDetail.firebaseId}`}>
                        {userProductInfo.email}
                     </Link>
                  </h2>
                  <div className='productDetail'>
                     <Row>
                        <Col span={5} style={{ textAlign: 'center' }}>
                           <h2>${productDetail.price}</h2>
                        </Col>

                        <Col span={19}>
                           <h3>
                              Save 7% <p>Duis esse amet magna cupidatat</p>
                           </h3>
                        </Col>
                     </Row>
                  </div>
                  <h3>{productDetail.description}</h3>
                  <Button className='addButton'>Add to Cart</Button>
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
               </Col>
            </Row>
         </div>
      </>
   );
}

export default ProductDetail;
