import {
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
   Modal,
   Row,
   Skeleton,
   Space,
   Typography,
} from 'antd';
import parse from 'html-react-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [more, setMore] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [clickMap, setClickMap] = useState(false);

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
      return current && current < moment().endOf('day');
   }

   const disable = (!startDate || !endDate) && { disabled: true };
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
                           Rating: {productDetail.qualityRate}
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
                        <Paragraph
                           className='description'
                           ellipsis={{
                              rows: 4,
                              onEllipsis: (ellipsis) => {
                                 setMore(ellipsis);
                              },
                           }}
                        >
                           <>{parse(productDetail.description)}</>
                        </Paragraph>

                        {more === true && (
                           <h5
                              className='readMore'
                              onClick={() => setIsModalVisible(true)}
                           >
                              more details
                           </h5>
                        )}
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
                           }}
                           showTime
                           format='YYYY/MM/DD HH:mm'
                           onChange={onChange}
                        />
                        <Button
                           className='addButton'
                           onClick={() => onClickAdd(productDetail)}
                           {...disable}
                        >
                           Add to Cart
                        </Button>
                     </Space>
                  </Row>
                  <Row className='avatarGroup'>
                     <Space>
                        <Avatar.Group maxCount={4}>
                           {orderInToday.length > 0 ? (
                              orderInToday.map((o) => (
                                 <Avatar src={o.User.photoURL} key={o.id} />
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
                        <div className='card' onClick={() => setClickMap(true)}>
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

         {more === true && (
            <Modal
               title='Product Description'
               visible={isModalVisible}
               onOk={() => setIsModalVisible(false)}
               onCancel={() => setIsModalVisible(false)}
            >
               <Paragraph>{parse(productDetail.description)}</Paragraph>
            </Modal>
         )}
      </>
   );
}

export default ProductDetailDescription;
