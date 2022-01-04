import {
   AimOutlined,
   CheckCircleOutlined,
   FileProtectOutlined,
   SmileOutlined,
   UserOutlined,
} from '@ant-design/icons';
import {
   Avatar,
   Button,
   Col,
   DatePicker,
   Row,
   Skeleton,
   Space,
   Typography,
   Tooltip,
} from 'antd';
import parse from 'html-react-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import './ProductDetailDescription.scss';

ProductDetailDescription.propTypes = {
   productDetail: PropTypes.object,
   onClickAddProduct: PropTypes.func,
   orderInToday: PropTypes.array,
};

ProductDetailDescription.defaultProps = {
   productDetail: {},
   onClickAddProduct: null,
   orderInToday: [],
};

const { RangePicker } = DatePicker;
const { Paragraph, Text } = Typography;

function ProductDetailDescription(props) {
   const { productDetail, onClickToAddProduct, orderInToday } = props;
   console.log('productDetail: ', productDetail);

   const history = useHistory();
   const isUserLogging = localStorage.getItem('providerData') ? true : false;

   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [clickMap, setClickMap] = useState(false);
   const [clickLocate, setClickLocate] = useState(false);
   const currentUserId = useSelector((state) => state.users.id);

   const onChange = (dates, dateStrings) => {
      if (!dates || !dateStrings) return;

      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
   };

   const onClickAdd = (product) => {
      const destructuring = (product) => {
         const split = { ...product };
         split.startDate = startDate;
         split.endDate = endDate;

         return split;
      };

      onClickToAddProduct(destructuring(product));
   };

   function disabledDate(current) {
      return (
         current < moment().startOf('day') && current < moment().endOf('day')
      );
   }

   const disableAddToCartButton = () => {
      if (!startDate || !endDate) return { disabled: true };
      if (currentUserId === productDetail.User.firebaseId)
         return { disabled: true };
   };

   return (
      <>
         {!productDetail.name ||
         !productDetail.price ||
         !productDetail.description ? (
            <Skeleton active className='skeletonLoading' />
         ) : (
            <>
               {clickMap === true && (
                  <Redirect
                     to={{
                        pathname: '/maps',
                        state: {
                           type: 'searchNearMe',
                           productDetail: productDetail,
                        },
                     }}
                  />
               )}
               {clickLocate === true && (
                  <Redirect
                     to={{
                        pathname: '/maps',
                        state: {
                           type: 'searchOne',
                           productDetail: productDetail,
                        },
                     }}
                  />
               )}
               <div className='productDetail'>
                  <Row className='productHeaderRow'>
                     <Col flex='auto'>
                        <h1>{productDetail.name}</h1>
                     </Col>
                     <Col>
                        <div className='qualityRate'>
                           Rented: {productDetail.completed || 0}
                        </div>
                     </Col>
                     <Col>
                        <div className='qualityRate'>
                           Rating: {productDetail.qualityRate || 0}
                        </div>
                     </Col>
                  </Row>
                  <Row span={24} className='productPriceRow'>
                     <p>$</p>
                     <h2>{priceFormat(productDetail.price).split('$')}</h2>
                     <h3>in shipping + handling</h3>
                     <Col></Col>
                  </Row>

                  <div className='productDescriptionRow'>
                     <div className='productDescription'>
                        <Paragraph className='description'>
                           <>{parse(productDetail.description)}</>
                        </Paragraph>
                     </div>
                  </div>
                  <Row span={24} className='buttonRow'>
                     <Space>
                        <RangePicker
                           className='datePicker'
                           disabledDate={disabledDate}
                           ranges={{
                              'Rent Tomorrow': [
                                 moment().add(1, 'days'),
                                 moment().add(2, 'days'),
                              ],
                              '30 days': [
                                 moment().add(1, 'days'),
                                 moment().add(31, 'days'),
                              ],
                              Test: [
                                 moment().subtract(2, 'days'),
                                 moment().subtract(1, 'days'),
                              ],
                           }}
                           showTime
                           format='YYYY/MM/DD HH:mm'
                           onChange={onChange}
                        />
                        <Button
                           className='addButton'
                           onClick={() => onClickAdd(productDetail)}
                           {...disableAddToCartButton()}
                        >
                           Add to Cart
                        </Button>
                        <Tooltip
                           placement='topLeft'
                           title={`${productDetail?.pins[0].address} ${productDetail?.pins[0].ward} ${productDetail?.pins[0].district} ${productDetail?.pins[0].city}`}
                        >
                           <Button
                              className='locateButton'
                              onClick={() => {
                                 if (isUserLogging === false)
                                    return history.push('/account/login');
                                 setClickLocate(true);
                              }}
                              icon={<AimOutlined />}
                           />
                        </Tooltip>
                     </Space>
                  </Row>
                  <Row className='avatarGroup'>
                     <Space>
                        <Avatar.Group maxCount={4}>
                           {orderInToday.length > 0 ? (
                              orderInToday.map((o) => (
                                 <Avatar src={o.photoURL} key={o.firebaseId} />
                              ))
                           ) : (
                              <Avatar icon={<UserOutlined />} />
                           )}
                        </Avatar.Group>
                        <h4>
                           {orderInToday?.length} other people tried it today
                        </h4>
                     </Space>
                  </Row>
                  <Row
                     justify='space-around'
                     align='middle'
                     style={{ marginTop: 30 }}
                  >
                     <Col>
                        <div
                           className='card'
                           onClick={() => {
                              if (isUserLogging === false)
                                 return history.push('/account/login');
                              setClickMap(true);
                           }}
                        >
                           <img
                              src='https://firebasestorage.googleapis.com/v0/b/camera-rental-firbase.appspot.com/o/public%2FArtboard%201.png?alt=media&token=31b68b46-a498-4179-8fce-56652d472d0f'
                              alt='photos'
                           />
                           <div className='info'>
                              <h1>Near me</h1>
                           </div>
                        </div>
                     </Col>
                     <Col flex='auto'>
                        <div className='productDescriptionInfo'>
                           <Space direction='vertical' size='middle'>
                              <div>
                                 <CheckCircleOutlined className='descriptionIcon' />
                                 <Text>Free shipping.</Text>
                              </div>
                              <div>
                                 <SmileOutlined className='descriptionIcon' />
                                 <Text>Refund if the product is damage.</Text>
                              </div>
                              <div>
                                 <FileProtectOutlined className='descriptionIcon' />
                                 <Text>Genuine product.</Text>
                              </div>
                           </Space>
                        </div>
                     </Col>
                  </Row>
               </div>
            </>
         )}
      </>
   );
}

export default ProductDetailDescription;
