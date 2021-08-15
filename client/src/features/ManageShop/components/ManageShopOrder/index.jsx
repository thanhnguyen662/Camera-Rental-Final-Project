import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
   Table,
   Image,
   Row,
   Col,
   Divider,
   DatePicker,
   Modal,
   Tag,
   Button,
   Typography,
   Space,
   Avatar,
   Spin,
} from 'antd';
import {
   InfoCircleOutlined,
   CheckOutlined,
   CloseOutlined,
   PayCircleOutlined,
   RollbackOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import priceFormat from '../../../../utils/PriceFormat';
import moment from 'moment';
import './ManageShopOrder.scss';
import userApi from '../../../../api/userApi';

ManageShopOrder.propTypes = {
   myProductInOrder: PropTypes.array,
   handleUpdateOrder: PropTypes.func,
};

ManageShopOrder.defaultProps = {
   myProductInOrder: [],
   handleUpdateOrder: null,
};

const { RangePicker } = DatePicker;
const { Paragraph, Text } = Typography;

function ManageShopOrder(props) {
   const {
      myProductInOrder,
      handleAcceptOrder,
      handleDeclineOrder,
      handleOrderUserNotCome,
      handlePaidOrder,
      handleBackOrder,
   } = props;

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isModalUserVisible, setIsModalUserVisible] = useState(false);
   const [orderDetail, setOrderDetail] = useState();
   const [userDetailFirebase, setUserDetailFirebase] = useState({});
   const [userStats, setUserStats] = useState({});

   useEffect(() => {
      if (!orderDetail) return;
      const getUserDetailOnFirebase = async () => {
         try {
            const getUserInfo = await userApi.getMe({
               uid: orderDetail?.User.firebaseId,
            });
            setUserDetailFirebase(getUserInfo);

            const getStat = await userApi.getUserStats({
               userId: getUserInfo.uid,
            });
            setUserStats(getStat);

            console.log('userInfo', getUserInfo);
            console.log('getStat', getStat);
         } catch (error) {
            console.log(error);
         }
      };
      getUserDetailOnFirebase();
   }, [orderDetail]);

   const onClickAccept = () => {
      handleAcceptOrder({
         orderId: orderDetail.id,
         orderStatusId: 5, //ACCEPT
         orderItems: orderDetail.orderItems,
      });
   };

   const onClickFailure = () => {
      handleDeclineOrder({
         orderId: orderDetail.id,
         orderStatusId: 4, //FAILURE
         orderItems: orderDetail.orderItems,
      });
   };

   const onClickNotCome = () => {
      handleOrderUserNotCome({
         orderId: orderDetail.id,
         orderStatusId: 4, //FAILURE
         orderItems: orderDetail.orderItems,
      });
   };

   const onClickPaid = () => {
      handlePaidOrder({
         orderId: orderDetail.id,
         orderStatusId: 3, //RENTED
         paidAt: moment().format('YYYY-MM-DD HH:mm'),
      });
   };

   const onClickBack = () => {
      handleBackOrder({
         orderId: orderDetail.id,
         orderStatusId: 6, //BACK
         backAt: moment().format('YYYY-MM-DD HH:mm'),
         orderItems: orderDetail.orderItems,
      });
   };

   const columns = [
      {
         title: 'Image',
         dataIndex: ['Product', 'productPhotoURL'],
         width: 120,
         render: (record) => (
            <Image src={record[0]} width={80} style={{ minHeight: 80 }} />
         ),
      },
      {
         title: 'Name',
         dataIndex: ['Product'],
         width: 250,
         render: (record) => (
            <Link to={`/product/${record.slug}`}>
               <Text
                  width={80}
                  style={{ minHeight: 80 }}
                  className='orderUsername'
               >
                  {record.name}
               </Text>
            </Link>
         ),
      },
      {
         title: 'Start - End',
         render: (record) => {
            const startDate = moment(record.startDate);
            const endDate = moment(record.endDate);
            return (
               <RangePicker
                  disabled
                  className='productManageDate'
                  disable
                  defaultValue={[startDate, endDate]}
                  format='YYYY/MM/DD HH:mm'
               />
            );
         },
      },
   ];

   const tileOfTable = (order) => {
      const statusTagColor = () => {
         switch (order.orderStatus?.name) {
            case 'PENDING':
               return {
                  color: 'processing',
               };
            case 'RENTED':
               return {
                  color: 'success',
               };
            case 'FAILURE':
               return {
                  color: 'error',
               };
            case 'BACK':
               return {
                  color: 'warning',
               };
            case 'ACCEPT': {
               return {
                  color: 'blue',
               };
            }
            default:
               break;
         }
      };
      return (
         <div>
            <Row>
               <Col flex='auto'>
                  <Tag {...statusTagColor()}>{order.orderStatus?.name}</Tag>
                  <Divider type='vertical' />
                  &nbsp;
                  <Space size='middle'>
                     <Avatar
                        size={30}
                        src={order?.User.photoURL}
                        onClick={() => {
                           setOrderDetail(order);
                           setIsModalUserVisible(true);
                        }}
                        style={{ cursor: 'pointer' }}
                     />
                     <Link
                        to={`/profile/${order.User?.firebaseId}`}
                        className='orderUsername'
                     >
                        <b>{order.User?.username}</b>
                     </Link>
                  </Space>
               </Col>
               <Col>
                  <Space size='middle'>
                     <InfoCircleOutlined
                        className='orderDetailButton'
                        onClick={() => {
                           console.log('orderDetail', order);
                           setOrderDetail(order);
                           setIsModalVisible(true);
                        }}
                     />
                  </Space>
               </Col>
            </Row>
         </div>
      );
   };

   const footerOfTable = (totalPrice) => {
      return (
         <Row>
            <Col flex='auto' className='footerTitle'>
               Total Price:
            </Col>
            <Col className='footerOfTable'>{priceFormat(totalPrice)}</Col>
         </Row>
      );
   };

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
         {myProductInOrder.length !== 0 ? (
            myProductInOrder.map((order) => (
               <div key={order.id}>
                  <Table
                     className='manageShopOrderTable'
                     ellipsis={true}
                     pagination={false}
                     rowKey={(record) => record.id}
                     dataSource={order.orderItems}
                     columns={columns}
                     title={() => tileOfTable(order)}
                     footer={() => footerOfTable(order.totalPrice)}
                  />
               </div>
            ))
         ) : (
            <Table hasData={true} className='orderTableEmpty' />
         )}

         <Modal
            title={`ID: ${orderDetail?.id}`}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            className='productOrderDetailModal'
            footer={[
               <Button
                  key='notCome'
                  onClick={() => {
                     onClickNotCome();
                     setIsModalVisible(false);
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
                     setIsModalVisible(false);
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
                     setIsModalVisible(false);
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
                     setIsModalVisible(false);
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
                     setIsModalVisible(false);
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

         <Modal
            visible={isModalUserVisible}
            onCancel={() => setIsModalUserVisible(false)}
            className='modalUserDetails'
            width={400}
         >
            {!userDetailFirebase?.displayName ? (
               <Spin />
            ) : (
               <>
                  <div>
                     <Row justify='space-around' align='middle'>
                        <Col>
                           <Avatar src={orderDetail?.User.photoURL} size={70} />
                        </Col>
                        <Col flex='auto' push='1'>
                           <Paragraph>
                              <Text>123</Text>
                           </Paragraph>
                        </Col>
                     </Row>
                  </div>
               </>
            )}
         </Modal>
      </>
   );
}

export default ManageShopOrder;
