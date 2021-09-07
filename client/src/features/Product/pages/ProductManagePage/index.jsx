// import { Col, Row } from 'antd';
// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import commentApi from '../../../../api/commentApi';
// import orderApi from '../../../../api/orderApi';
// import userApi from '../../../../api/userApi';
// import BreadcrumbBar from '../../../../components/BreadcrumbBar';
// import openNotificationWithIcon from '../../../../components/Notification';
// import ProductManageAvatar from '../../components/ProductManageAvatar';
// import ProductManageTable from '../../components/ProductManageTable';
// import ProductManageTitle from '../../components/ProductManageTitle';

// function ProductManagePage(props) {
//    const userId = useSelector((state) => state.users.id);
//    const userAvatar = useSelector((state) => state.users.photoURL);
//    const username = useSelector((state) => state.users.username);
//    const email = useSelector((state) => state.users.email);
//    const phoneNumber = useSelector((state) => state.users.phoneNumber);
//    const userPhotoURL = useSelector((state) => state.users.photoURL);
//    const name = useSelector((state) => state.users.name);

//    const [orders, setOrders] = useState([]);
//    const [current, setCurrent] = useState(0);
//    const [page, setPage] = useState(1);
//    const [newComment, setNewComment] = useState({});

//    const ref = useRef(page);

//    useEffect(() => {
//       if (!userId) return;
//       if (page > 1) {
//          if (ref.current === page) return;
//       }
//       const getOrdersByUserId = async () => {
//          try {
//             const query = {
//                userId: userId,
//                orderStatusId: current || null,
//                page: page,
//             };
//             const response = await orderApi.manageOrder(query);

//             response.sort((a, b) => {
//                return new Date(b.createdAt) - new Date(a.createdAt);
//             });
//             console.log('Product by user Orders: ', response);
//             setOrders((prev) => [...prev, ...response]);
//          } catch (error) {
//             console.log(error);
//          }
//       };
//       getOrdersByUserId();
//    }, [userId, current, page]);

//    useEffect(() => {
//       setPage(1);
//       setOrders([]);
//    }, [current]);

//    const handlePageChange = () => {
//       setPage(page + 1);
//    };

//    useEffect(() => {
//       ref.current = page;
//    }, [page]);

//    const handleClickTitle = (id) => {
//       setCurrent(id);
//    };

//    const handleClickDeleteOrderButton = async (orderId) => {
//       try {
//          const data = {
//             orderId: orderId,
//          };
//          const response = await orderApi.deleteOrder(data);
//          console.log('Removed order Successful: ', response);
//          setOrders(orders.filter((o) => o.id !== response.id));
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const handleClickCommentButton = async (
//       values,
//       orderItemDetail,
//       orderId
//    ) => {
//       const formValues = {
//          content: values.comment,
//          productId: orderItemDetail.Product?.id,
//          authorId: userId,
//          rate: values.rate,
//       };

//       try {
//          const response = await commentApi.createComment(formValues);

//          const updateIsShopComment = await orderApi.updateIsComment({
//             commentId: response.id,
//             orderId: orderId,
//             type: 'isProductComment',
//          });

//          console.log('comment created Successful: ', response);
//          console.log('updateIsProductComment: ', updateIsShopComment);

//          if (updateIsShopComment?.message === 'Already Comment')
//             return openNotificationWithIcon(
//                'error',
//                'Error',
//                'Already Comment'
//             );
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const handleOnSubmitComment = async (values) => {
//       try {
//          const response = await userApi.createUserComment({
//             content: values.content,
//             rate: values.rate,
//             userId: values.userId,
//             authorId: userId,
//             authorUsername: username,
//             authorPhotoURL: userPhotoURL,
//          });

//          const updateIsShopComment = await orderApi.updateIsComment({
//             commentId: response.id,
//             orderId: values.orderId,
//             type: 'isShopComment',
//          });

//          console.log('updateIsShopComment: ', updateIsShopComment);
//          console.log('Commented: ', response);

//          if (updateIsShopComment?.message === 'Already Comment')
//             return openNotificationWithIcon(
//                'error',
//                'Error',
//                'Already Comment'
//             );
//          setNewComment(response);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    return (
//       <div>
//          <BreadcrumbBar />
//          <Row gutter={[12, 10]}>
//             <Col span={5}>
//                <ProductManageAvatar
//                   userAvatar={userAvatar}
//                   username={username}
//                   email={email}
//                   phoneNumber={phoneNumber}
//                   name={name}
//                />
//                <ProductManageTitle handleClickTitle={handleClickTitle} />
//             </Col>
//             <Col span={19}>
//                {current >= 0 && current <= 6 && (
//                   <ProductManageTable
//                      orders={orders}
//                      handleClickDeleteOrderButton={handleClickDeleteOrderButton}
//                      handleClickCommentButton={handleClickCommentButton}
//                      current={current}
//                      userPhotoURL={userPhotoURL}
//                      handlePageChange={handlePageChange}
//                      handleOnSubmitComment={handleOnSubmitComment}
//                      newComment={newComment}
//                   />
//                )}
//             </Col>
//          </Row>
//       </div>
//    );
// }

// export default ProductManagePage;
