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
   UserOutlined,
   IdcardOutlined,
   ClusterOutlined,
   HomeOutlined,
   CloseOutlined,
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
   const { myProductInOrder, handleUpdateOrder } = props;

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isModalUserVisible, setIsModalUserVisible] = useState(false);
   const [orderDetail, setOrderDetail] = useState();
   const [userDetailFirebase, setUserDetailFirebase] = useState({});
   useEffect(() => {
      if (!orderDetail) return;
      const getUserDetailOnFirebase = async () => {
         try {
            setUserDetailFirebase({});
            const response = await userApi.getMe({
               uid: orderDetail?.User.firebaseId,
            });

            console.log(response);
            setUserDetailFirebase(response);
         } catch (error) {
            console.log(error);
         }
      };
      getUserDetailOnFirebase();
   }, [orderDetail]);

   const onClickAccept = () => {
      handleUpdateOrder({
         orderId: orderDetail.id,
         orderStatusId: 5, //ACCEPT
         orderItems: orderDetail.orderItems,
         paidAt: null,
      });
   };

   const onClickFailure = () => {
      handleUpdateOrder({
         orderId: orderDetail.id,
         orderStatusId: 4, //FAILURE
         note: 'Shop cancel',
         paidAt: null,
      });
   };

   const onClickPaid = () => {
      handleUpdateOrder({
         orderId: orderDetail.id,
         orderStatusId: 3, //SUCCESS PAID
         paidAt: moment().format('YYYY-MM-DD HH:mm'),
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
         dataIndex: ['Product', 'name'],
         width: 250,
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
            case 'SUCCESS':
               return {
                  color: 'success',
               };
            case 'FAILURE':
               return {
                  color: 'error',
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
      };
   };

   const disablePaid = () => {
      if (orderDetail?.orderStatus.name === 'ACCEPT') return;
      return {
         disabled: true,
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
                  key='paid'
                  icon={<CheckOutlined />}
                  onClick={() => {
                     onClickPaid();
                     setIsModalVisible(false);
                  }}
                  {...disablePaid()}
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
                  Accept Order
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
            style={{ textAlign: 'center' }}
            className='modalUserDetails'
            width={450}
         >
            {!userDetailFirebase?.displayName ? (
               <Spin />
            ) : (
               <>
                  <Avatar
                     src={orderDetail?.User.photoURL}
                     size={70}
                     className='orderDetailUserPhoto'
                  />
                  <br />
                  <div className='orderDetailName'>
                     {userDetailFirebase?.displayName}
                  </div>
                  <div className='orderDetailUsername'>
                     {userDetailFirebase?.email} | {orderDetail?.User.username}
                  </div>
                  <div className='orderDetailUserInfo'>
                     <Row className='orderDetailUserInfoRow'>
                        <Col flex='28px' offset={4}>
                           <IdcardOutlined />
                        </Col>
                        <Col>
                           <Text>{orderDetail?.User.firebaseId}</Text>
                        </Col>
                     </Row>
                     <Row className='orderDetailUserInfoRow'>
                        <Col flex='28px' offset={4}>
                           <ClusterOutlined />
                        </Col>
                        <Col>
                           <Text>{orderDetail?.User.phoneNumber}</Text>
                        </Col>
                     </Row>
                     <Row className='orderDetailUserInfoRow'>
                        <Col flex='28px' offset={4}>
                           <HomeOutlined />
                        </Col>
                        <Col>
                           <Text>{orderDetail?.address}</Text>
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
