import { InfoCircleOutlined } from '@ant-design/icons';
import {
   Avatar,
   Col,
   DatePicker,
   Divider,
   Image,
   Row,
   Space,
   Table,
   Tag,
   Typography,
} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import priceFormat from '../../../../utils/PriceFormat';
import ManageShopModalOrder from '../ManageShopModalOrder';
import ManageShopModalUser from '../ManageShopModalUser';
import './ManageShopOrder.scss';

ManageShopOrder.propTypes = {
   myProductInOrder: PropTypes.array,
   handleUpdateOrder: PropTypes.func,
   newComment: PropTypes.object,
   handlePageChange: PropTypes.func,
};

ManageShopOrder.defaultProps = {
   myProductInOrder: [],
   handleUpdateOrder: null,
   newComment: {},
   handlePageChange: null,
};

const { RangePicker } = DatePicker;
const { Text } = Typography;

function ManageShopOrder(props) {
   const {
      myProductInOrder,
      handleAcceptOrder,
      handleDeclineOrder,
      handleOrderUserNotCome,
      handlePaidOrder,
      handleBackOrder,
      handleOnSubmitComment,
      newComment,
      handlePageChange,
   } = props;

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isModalUserVisible, setIsModalUserVisible] = useState(false);
   const [orderDetail, setOrderDetail] = useState();
   const [userDetailFirebase, setUserDetailFirebase] = useState({});
   const [userStats, setUserStats] = useState();
   const [userComment, setUserComment] = useState([]);
   const [onClickExplain, setOnClickExplain] = useState(false);

   const photoURL = useSelector((state) => state.users.photoURL);

   useEffect(() => {
      setOnClickExplain(false);
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

   useEffect(() => {
      if (!onClickExplain) return setUserComment([]);
      const onClickCommentExplain = async () => {
         try {
            const response = await userApi.getUserComments({
               userId: orderDetail?.User.firebaseId,
            });
            console.log('Comment', response);
            setUserComment(response);
         } catch (error) {
            console.log(error);
         }
      };
      onClickCommentExplain();
      // eslint-disable-next-line
   }, [onClickExplain]);

   useEffect(() => {
      if (Object.keys(newComment).length === 0) return;
      setUserComment((prev) => [newComment, ...prev]);
   }, [newComment]);

   const handleArrowOnClick = () => {
      onClickExplain ? setOnClickExplain(false) : setOnClickExplain(true);
   };

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
            <Image
               src={record[0]}
               width={80}
               style={{ minHeight: 80, borderRadius: 10, objectFit: 'cover' }}
            />
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
                     <Text>
                        {moment(order.createdAt).format('YYYY-MM-DD HH:mm')}
                     </Text>
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

   const handleOnClickCloseUserModal = () => {
      setIsModalUserVisible(false);
   };

   const handleOnClickCloseOrderModal = () => {
      setIsModalVisible(false);
   };

   const disableInput = () => {
      const disableInput = orderDetail.isUserComment === true && {
         disabled: true,
      };

      return disableInput;
   };

   return (
      <>
         {myProductInOrder.length !== 0 ? (
            <InfiniteScroll
               dataLength={myProductInOrder.length}
               next={() => handlePageChange()}
               hasMore={true}
            >
               {myProductInOrder.map((order) => (
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
               ))}
            </InfiniteScroll>
         ) : (
            <Table hasData={true} className='orderTableEmpty' />
         )}
         <ManageShopModalOrder
            orderDetail={orderDetail}
            isModalVisible={isModalVisible}
            onClickNotCome={onClickNotCome}
            onClickBack={onClickBack}
            onClickPaid={onClickPaid}
            onClickAccept={onClickAccept}
            onClickFailure={onClickFailure}
            handleOnClickCloseOrderModal={handleOnClickCloseOrderModal}
         />
         <ManageShopModalUser
            isModalUserVisible={isModalUserVisible}
            userDetailFirebase={userDetailFirebase}
            orderDetail={orderDetail}
            orderDetailUser={orderDetail?.User}
            userStats={userStats}
            onClickExplain={onClickExplain}
            userComment={userComment}
            handleArrowOnClick={handleArrowOnClick}
            photoURL={photoURL}
            handleOnSubmitComment={handleOnSubmitComment}
            handleOnClickCloseUserModal={handleOnClickCloseUserModal}
            disableInput={disableInput}
         />
      </>
   );
}

export default ManageShopOrder;
