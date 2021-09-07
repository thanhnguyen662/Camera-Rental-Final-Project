// import { CommentOutlined, InfoCircleOutlined } from '@ant-design/icons';
// import {
//    Col,
//    DatePicker,
//    Divider,
//    Image,
//    Row,
//    Space,
//    Table,
//    Tag,
//    Typography,
// } from 'antd';
// import Avatar from 'antd/lib/avatar/avatar';
// import moment from 'moment';
// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import userApi from '../../../../api/userApi';
// import priceFormat from '../../../../utils/PriceFormat';
// import ManageShopModalUser from '../../../ManageShop/components/ManageShopModalUser';
// import ProductManageModalComment from '../ProductManageModalComment';
// import ProductManageModalOrder from '../ProductManageModalOrder';
// import './ProductManageTable.scss';

// ProductManageTable.propTypes = {
//    orders: PropTypes.array,
//    handleClickDeleteOrderButton: PropTypes.func,
//    handleClickCommentButton: PropTypes.func,
//    userPhotoURL: PropTypes.string,
//    handlePageChange: PropTypes.func,
//    handleOnSubmitComment: PropTypes.func,
// };

// ProductManageTable.defaultProps = {
//    orders: [],
//    handleClickDeleteOrderButton: null,
//    handleClickCommentButton: null,
//    userPhotoURL: '',
//    handlePageChange: null,
//    handleOnSubmitComment: null,
// };

// const { RangePicker } = DatePicker;
// const { Text } = Typography;

// function ProductManageTable(props) {
//    const {
//       orders,
//       handleClickDeleteOrderButton,
//       current,
//       handleClickCommentButton,
//       userPhotoURL,
//       handlePageChange,
//       handleOnSubmitComment,
//       newComment,
//    } = props;
//    const photoURL = useSelector((state) => state.users.photoURL);

//    const [isModalVisible, setIsModalVisible] = useState(false);
//    const [isModalUserVisible, setIsModalUserVisible] = useState(false);
//    const [userStats, setUserStats] = useState();
//    const [orderDetail, setOrderDetail] = useState();
//    const [commentModal, setCommentModal] = useState(false);
//    const [orderItemDetail, setOrderItemDetail] = useState({});
//    const [onClickExplain, setOnClickExplain] = useState(false);
//    const [userComment, setUserComment] = useState([]);
//    const [userDetailFirebase, setUserDetailFirebase] = useState({});

//    useEffect(() => {
//       setOnClickExplain(false);
//       if (!orderDetail) return;
//       const getUserDetailOnFirebase = async () => {
//          try {
//             const getUserInfo = await userApi.getMe({
//                uid: orderDetail.orderItems[0]?.Product.User.firebaseId,
//             });
//             setUserDetailFirebase(getUserInfo);

//             const getStat = await userApi.getUserStats({
//                userId: getUserInfo.uid,
//             });
//             setUserStats(getStat);

//             console.log('userInfo', getUserInfo);
//             console.log('getStat', getStat);
//          } catch (error) {
//             console.log(error);
//          }
//       };
//       getUserDetailOnFirebase();
//    }, [orderDetail]);

//    useEffect(() => {
//       if (!onClickExplain) return setUserComment([]);
//       const onClickCommentExplain = async () => {
//          try {
//             const response = await userApi.getUserComments({
//                userId: orderDetail.orderItems[0]?.Product.User.firebaseId,
//             });
//             console.log('Comment', response);
//             setUserComment(response);
//          } catch (error) {
//             console.log(error);
//          }
//       };
//       onClickCommentExplain();
//       // eslint-disable-next-line
//    }, [onClickExplain]);

//    let columns = [
//       {
//          title: 'Image',
//          dataIndex: ['Product', 'productPhotoURL'],
//          width: 80,
//          render: (record) => (
//             <Image
//                src={record[0]}
//                width={80}
//                style={{ minHeight: 80, borderRadius: 10, objectFit: 'cover' }}
//             />
//          ),
//       },
//       {
//          title: 'Name',
//          dataIndex: ['Product'],
//          width: 100,
//          render: (record) => (
//             <Link to={`/product/${record.slug}`} className='productManageName'>
//                {record.name}
//             </Link>
//          ),
//       },
//       {
//          title: 'Start - End',
//          width: 200,
//          render: (record) => {
//             const startDate = moment(record.startDate);
//             const endDate = moment(record.endDate);
//             return (
//                <RangePicker
//                   disabled
//                   className='productManageDate'
//                   disable
//                   defaultValue={[startDate, endDate]}
//                   format='YYYY/MM/DD HH:mm'
//                />
//             );
//          },
//       },
//    ];

//    current === 6 &&
//       columns.push({
//          title: 'Comment',
//          width: 60,
//          render: (record) => (
//             <CommentOutlined
//                className='commentButton'
//                key={record.id}
//                onClick={() => {
//                   setCommentModal(true);
//                   setOrderItemDetail(record);
//                }}
//             />
//          ),
//       });

//    const tileOfTable = (order) => {
//       const statusTagColor = () => {
//          switch (order.orderStatus?.name) {
//             case 'PENDING':
//                return {
//                   color: 'processing',
//                };
//             case 'RENTED':
//                return {
//                   color: 'success',
//                };
//             case 'FAILURE':
//                return {
//                   color: 'error',
//                };
//             case 'ACCEPT': {
//                return {
//                   color: 'blue',
//                };
//             }
//             case 'BACK': {
//                return {
//                   color: 'warning',
//                };
//             }
//             default:
//                break;
//          }
//       };
//       return (
//          <div>
//             <Row>
//                <Col flex='auto'>
//                   <Tag {...statusTagColor()}>{order.orderStatus?.name}</Tag>
//                   <Divider type='vertical' />
//                   <Space size='middle'>
//                      <Avatar
//                         className='productManageAvatar'
//                         src={order.orderItems[0]?.Product.User.photoURL}
//                         size={30}
//                         onClick={() => {
//                            setOrderDetail(order);
//                            setIsModalUserVisible(true);
//                         }}
//                      />
//                      <Link
//                         to={`/profile/${order.orderItems[0]?.Product.User.firebaseId}`}
//                         className='productManageName'
//                      >
//                         <b>{order.orderItems[0].Product.User.username}</b>
//                      </Link>
//                   </Space>
//                </Col>
//                <Col>
//                   <Space>
//                      <Text>
//                         {moment(order.createdAt).format('YYYY-MM-DD HH:mm')}
//                      </Text>
//                      <InfoCircleOutlined
//                         className='orderDetailButton'
//                         onClick={() => {
//                            setOrderDetail(order);
//                            setIsModalVisible(true);
//                         }}
//                      />
//                   </Space>
//                </Col>
//             </Row>
//          </div>
//       );
//    };

//    const footerOfTable = (totalPrice) => {
//       return (
//          <Row>
//             <Col flex='auto' className='footerTitle'>
//                Total Price:
//             </Col>
//             <Col className='footerOfTable'>{priceFormat(totalPrice)}</Col>
//          </Row>
//       );
//    };

//    const handleOnClickCancelOrderModal = () => {
//       setIsModalVisible(false);
//    };

//    const handleOnClickCancelCommentModal = () => {
//       setCommentModal(false);
//    };

//    const handleArrowOnClick = () => {
//       onClickExplain ? setOnClickExplain(false) : setOnClickExplain(true);
//    };

//    const handleOnClickCloseUserModal = () => {
//       setIsModalUserVisible(false);
//    };

//    useEffect(() => {
//       if (Object.keys(newComment).length === 0) return;
//       setUserComment((prev) => [newComment, ...prev]);
//    }, [newComment]);

//    const disableInput = () => {
//       const disableInput = orderDetail.isShopComment === true && {
//          disabled: true,
//       };

//       return disableInput;
//    };

//    return (
//       <div>
//          {orders.length > 0 ? (
//             <InfiniteScroll
//                dataLength={orders.length}
//                next={() => handlePageChange()}
//                hasMore={true}
//             >
//                <div style={{ minHeight: '550px' }}>
//                   {orders.map((order) => (
//                      <div key={order.id} className='productManage'>
//                         <Table
//                            ellipsis={true}
//                            tableLayout='fixed'
//                            title={() => tileOfTable(order)}
//                            footer={() => footerOfTable(order.totalPrice)}
//                            className='productManageTable'
//                            pagination={false}
//                            rowKey={(record) => record.id}
//                            dataSource={order.orderItems}
//                            columns={columns}
//                         />
//                      </div>
//                   ))}
//                </div>
//             </InfiniteScroll>
//          ) : (
//             <div style={{ minHeight: '550px' }}>
//                <Table hasData={false} className='productManageTableEmpty' />
//             </div>
//          )}
//          <ProductManageModalOrder
//             orderDetail={orderDetail}
//             isModalVisible={isModalVisible}
//             handleOnClickCancelOrderModal={handleOnClickCancelOrderModal}
//             handleClickDeleteOrderButton={handleClickDeleteOrderButton}
//          />
//          <ProductManageModalComment
//             commentModal={commentModal}
//             handleOnClickCancelCommentModal={handleOnClickCancelCommentModal}
//             handleClickCommentButton={handleClickCommentButton}
//             userPhotoURL={userPhotoURL}
//             orderItemDetail={orderItemDetail}
//             orderDetail={orderDetail}
//          />
//          <ManageShopModalUser
//             isModalUserVisible={isModalUserVisible}
//             userDetailFirebase={userDetailFirebase}
//             orderDetail={orderDetail}
//             orderDetailUser={orderDetail?.orderItems[0].Product.User}
//             userStats={userStats}
//             onClickExplain={onClickExplain}
//             userComment={userComment}
//             handleArrowOnClick={handleArrowOnClick}
//             photoURL={photoURL}
//             handleOnSubmitComment={handleOnSubmitComment}
//             handleOnClickCloseUserModal={handleOnClickCloseUserModal}
//             disableInput={disableInput}
//          />
//       </div>
//    );
// }

// export default ProductManageTable;
