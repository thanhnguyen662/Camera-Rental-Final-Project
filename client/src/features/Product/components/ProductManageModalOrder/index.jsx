import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import priceFormat from '../../../../utils/PriceFormat';

ProductManageModalOrder.propTypes = {
   handleClickDeleteOrderButton: PropTypes.func,
   handleOnClickCancelOrderModal: PropTypes.func,
   isModalVisible: PropTypes.bool,
};

ProductManageModalOrder.defaultProps = {
   handleClickDeleteOrderButton: null,
   handleOnClickCancelOrderModal: null,
   isModalVisible: false,
};

const { Paragraph, Text } = Typography;

function ProductManageModalOrder(props) {
   const {
      orderDetail,
      isModalVisible,
      handleOnClickCancelOrderModal,
      handleClickDeleteOrderButton,
   } = props;

   const disableButton = () => {
      if (orderDetail?.orderStatus.name === 'PENDING') return;
      return {
         disabled: true,
      };
   };

   return (
      <>
         <Modal
            title={`ID: ${orderDetail?.id}`}
            visible={isModalVisible}
            onCancel={() => handleOnClickCancelOrderModal()}
            className='productOrderDetailModal'
            footer={[
               <Button
                  key='delete'
                  icon={<DeleteOutlined />}
                  onClick={() => {
                     handleClickDeleteOrderButton(orderDetail?.id);
                     handleOnClickCancelOrderModal();
                  }}
                  type='danger'
                  {...disableButton()}
               >
                  Delete Order
               </Button>,
               <Button
                  key='back'
                  onClick={() => handleOnClickCancelOrderModal()}
                  type='primary'
               >
                  OK
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
                              Created:
                              <br />
                              Updated:
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

export default ProductManageModalOrder;
