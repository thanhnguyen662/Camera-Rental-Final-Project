import {
   CheckOutlined,
   CloseOutlined,
   PayCircleOutlined,
   RollbackOutlined,
} from '@ant-design/icons';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import priceFormat from '../../../../utils/PriceFormat';
import PropTypes from 'prop-types';

ManageShopModalOrder.propTypes = {
   isModalVisible: PropTypes.bool,
   onClickNotCome: PropTypes.func,
   onClickBack: PropTypes.func,
   onClickPaid: PropTypes.func,
   onClickAccept: PropTypes.func,
   onClickFailure: PropTypes.func,
   handleOnClickCloseOrderModal: PropTypes.func,
};

ManageShopModalOrder.defaultProps = {
   isModalVisible: false,
   onClickNotCome: null,
   onClickBack: null,
   onClickPaid: null,
   onClickAccept: null,
   onClickFailure: null,
   handleOnClickCloseOrderModal: null,
};

const { Paragraph, Text } = Typography;

function ManageShopModalOrder(props) {
   const {
      orderDetail,
      isModalVisible,
      onClickNotCome,
      onClickBack,
      onClickPaid,
      onClickAccept,
      onClickFailure,
      handleOnClickCloseOrderModal,
   } = props;

   const disableButton = () => {
      if (orderDetail?.orderStatus.name === 'PENDING') return;
      return {
         disabled: true,
         style: {
            display: 'none',
         },
      };
   };

   const disablePaid = () => {
      if (orderDetail?.orderStatus.name === 'ACCEPT') return;
      return {
         disabled: true,
         style: {
            display: 'none',
         },
      };
   };

   const disableBack = () => {
      if (orderDetail?.orderStatus.name === 'RENTED') return;
      return {
         disabled: true,
         style: {
            display: 'none',
         },
      };
   };

   const disableUserNotCome = () => {
      if (orderDetail?.orderStatus.name === 'ACCEPT') return;

      return {
         disabled: true,
         style: {
            display: 'none',
         },
      };
   };

   return (
      <>
         <Modal
            title={`ID: ${orderDetail?.id}`}
            visible={isModalVisible}
            onCancel={() => handleOnClickCloseOrderModal()}
            className='productOrderDetailModal'
            footer={[
               <Button
                  key='notCome'
                  onClick={() => {
                     onClickNotCome();
                     handleOnClickCloseOrderModal();
                  }}
                  {...disableUserNotCome()}
               >
                  User not come
               </Button>,
               <Button
                  key='back'
                  icon={<RollbackOutlined />}
                  onClick={() => {
                     onClickBack();
                     handleOnClickCloseOrderModal();
                  }}
                  {...disableBack()}
               >
                  Product Back
               </Button>,
               <Button
                  key='paid'
                  icon={<PayCircleOutlined />}
                  onClick={() => {
                     onClickPaid();
                     handleOnClickCloseOrderModal();
                  }}
                  {...disablePaid()}
                  type='primary'
               >
                  Paid
               </Button>,
               <Button
                  key='accept'
                  icon={<CheckOutlined />}
                  onClick={() => {
                     console.log('Accept Order');
                     onClickAccept();
                     handleOnClickCloseOrderModal();
                  }}
                  type='primary'
                  {...disableButton()}
               >
                  Accept
               </Button>,
               <Button
                  key='decline'
                  icon={<CloseOutlined />}
                  onClick={() => {
                     console.log('Decline Order');
                     onClickFailure();
                     handleOnClickCloseOrderModal();
                  }}
                  type='danger'
                  {...disableButton()}
               >
                  Decline
               </Button>,
            ]}
         >
            <Paragraph>
               <Row>
                  <Col flex='auto'>
                     <Text className='orderDetailUsername'>
                        {orderDetail?.User.username}
                     </Text>
                     <br />
                     <Text>{orderDetail?.User.address}</Text>
                     <br />
                     <Text>{orderDetail?.User.phoneNumber}</Text>
                  </Col>
                  <Col className='orderDetailCreateAt'>
                     <Paragraph>
                        <Row>
                           <Col>
                              Created: &nbsp;
                              <br />
                              Updated: &nbsp;
                           </Col>
                           <Col>
                              <Text>
                                 {moment(orderDetail?.createdAt).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                 )}
                              </Text>
                              <br />
                              <Text>
                                 {moment(orderDetail?.updatedAt).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                 )}
                              </Text>
                           </Col>
                        </Row>
                     </Paragraph>
                  </Col>
               </Row>
            </Paragraph>
            <div className='productManageOrderDetailTable'>
               <Row className='headerText'>
                  <Col span={10}>
                     <h4>Name</h4>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center' }}>
                     <h4>Hours</h4>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center' }}>
                     <h4>Price</h4>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                     <h4>Total</h4>
                  </Col>
               </Row>
               <Divider />
               {orderDetail?.orderItems.map((item) => (
                  <Row key={item.id}>
                     <Col span={10}>
                        <Paragraph>{item.Product.name}</Paragraph>
                     </Col>
                     <Col span={4} style={{ textAlign: 'center' }}>
                        <Paragraph level={5}>{item.during}</Paragraph>
                     </Col>
                     <Col span={4} style={{ textAlign: 'center' }}>
                        <Paragraph level={5}>
                           {priceFormat(item.price)}
                        </Paragraph>
                     </Col>
                     <Col span={6}>
                        <Paragraph level={5} style={{ textAlign: 'right' }}>
                           {priceFormat(item.totalPricePerHour)}
                        </Paragraph>
                     </Col>
                  </Row>
               ))}

               <Divider />
               <Row className='totalPrice'>
                  <Col flex='auto'>
                     <div className='totalPriceTitle'>Total Price</div>
                  </Col>
                  <Col>
                     <div className='totalPriceCal'>
                        {priceFormat(orderDetail?.totalPrice)}
                     </div>
                  </Col>
               </Row>
            </div>
         </Modal>
      </>
   );
}

export default ManageShopModalOrder;
