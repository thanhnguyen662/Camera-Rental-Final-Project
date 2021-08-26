import { Col, Layout, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/orderApi';
import productApi from '../../../../api/productApi';
import userApi from '../../../../api/userApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ManageShopMenu from '../../components/ManageShopMenu';
import ManageShopOrder from '../../components/ManageShopOrder';
import ManageShopOverview from '../../components/ManageShopOverview';
import ManageShopProductTable from '../../components/ManageShopProductTable';
import './ManageShopPage.scss';

ManageShopPage.propTypes = {};

const { Content } = Layout;

function ManageShopPage(props) {
   const [current, setCurrent] = useState('overview');
   const [myProductInOrder, setMyProductInOrder] = useState([]);
   const [myProductInOrderOverview, setMyProductInOrderOverview] = useState([]);
   const [myProduct, setMyProduct] = useState([]);
   const [newComment, setNewComment] = useState({});
   const [page, setPage] = useState(1);
   const [countProductInOrder, setCountProductInOrder] = useState([]);

   const userId = useSelector((state) => state.users.id);
   const username = useSelector((state) => state.users.username);
   const photoURL = useSelector((state) => state.users.photoURL);

   const ref = useRef(page);

   useEffect(() => {
      if (!userId) return;
      const getMyProduct = async () => {
         const response = await productApi.getMyProduct({
            firebaseId: userId,
         });

         console.log('My product: ', response);

         setMyProduct(response);
      };
      getMyProduct();
   }, [userId, current]);

   useEffect(() => {
      if (!userId) return;
      const getMyProductInOrder = async () => {
         if (current !== 'overview') return;
         try {
            const response = await orderApi.myProductInOrderOverview({
               firebaseId: userId,
            });
            setMyProductInOrderOverview(response);

            const count = await orderApi.countMyProductOrder({
               firebaseId: userId,
            });
            setCountProductInOrder(count);
         } catch (error) {
            console.log(error);
         }
      };
      getMyProductInOrder();
   }, [userId, current]);

   useEffect(() => {
      setMyProductInOrder([]);
      setPage(1);
   }, [current]);

   useEffect(() => {
      if (!userId || current === 'overview') return;
      if (page > 1) {
         if (ref.current === page) return;
      }
      const getMyProductInOrder = async () => {
         try {
            const response = await orderApi.myProductInOrder({
               firebaseId: userId,
               orderStatus: current === 'ALL' ? null : current,
               page: page,
            });
            const sortResponse = response.sort((a, b) => {
               let dateA = new Date(a.createdAt);
               let dateB = new Date(b.createdAt);

               return dateB - dateA;
            });
            console.log(response);
            setMyProductInOrder((prev) => [...prev, ...sortResponse]);
         } catch (error) {
            console.log(error);
         }
      };
      getMyProductInOrder();
   }, [userId, current, page]);
   const handlePageChange = () => {
      setPage(page + 1);
   };

   useEffect(() => {
      ref.current = page;
   }, [page]);

   const handleOnSubmitComment = async (values) => {
      try {
         const response = await userApi.createUserComment({
            content: values.content,
            rate: values.rate,
            userId: values.userId,
            authorId: userId,
            authorUsername: username,
            authorPhotoURL: photoURL,
         });

         console.log('Commented: ', response);
         setNewComment(response);
      } catch (error) {
         console.log(error);
      }
   };

   const handleAcceptOrder = async (values) => {
      const response = await orderApi.updateOrder({
         orderId: values.orderId,
         orderStatusId: values.orderStatusId,
         orderItems: values.orderItems,
      });

      console.log('Order updated', response);
      updateDataToTableOrder(response);
   };

   const handleDeclineOrder = async (values) => {
      const response = await orderApi.updateOrder({
         orderId: values.orderId,
         orderStatusId: values.orderStatusId,
         orderItems: values.orderItems,
         note: 'Decline',
      });
      updateStats(response);
      console.log('Order updated', response);
      updateDataToTableOrder(response);
   };

   const handleOrderUserNotCome = async (values) => {
      const response = await orderApi.updateOrder({
         orderId: values.orderId,
         orderStatusId: values.orderStatusId,
         orderItems: values.orderItems,
         note: 'NotCome',
      });
      updateStats(response);
      console.log('Order updated', response);
      updateDataToTableOrder(response);
   };

   const handlePaidOrder = async (values) => {
      const response = await orderApi.updateOrderToPaid({
         orderId: values.orderId,
         orderStatusId: values.orderStatusId,
         paidAt: values.paidAt,
      });
      updateStats(response);
      console.log('Order updated', response);
      updateDataToTableOrder(response);
   };

   const handleBackOrder = async (values) => {
      const response = await orderApi.updateOrderToBack({
         orderId: values.orderId,
         orderStatusId: values.orderStatusId,
         orderItems: values.orderItems,
         backAt: values.backAt,
      });
      updateStats(response);
      console.log('Order updated', response);
      updateDataToTableOrder(response);
   };

   const updateStats = async (response) => {
      const updateUserStat = await orderApi.updateUserStat({
         userId: response.userId,
      });
      console.log('update Stats', updateUserStat);
   };

   const updateDataToTableOrder = (response) => {
      let array = [];
      const filterOldData = myProductInOrder.filter(
         (o) => o.id !== response.id
      );
      array = filterOldData;
      array.unshift(response);

      setMyProductInOrder(array);
   };

   const handleCurrentMenuChange = (value) => {
      setCurrent(value);
   };

   return (
      <div>
         <BreadcrumbBar />
         <Layout className='manageShopPageLayout'>
            <Row>
               <Col span={4}>
                  <ManageShopMenu
                     handleCurrentMenuChange={handleCurrentMenuChange}
                  />
               </Col>
               <Col span={20}>
                  <Content className='manageShopPageContent'>
                     {current === 'overview' && (
                        <ManageShopOverview
                           allMyProductInOrder={myProductInOrderOverview}
                           setCurrent={setCurrent}
                           countProductInOrder={countProductInOrder}
                        />
                     )}
                     {current === 'allProduct' && (
                        <ManageShopProductTable myProduct={myProduct} />
                     )}
                     {current !== 'allProduct' && current !== 'overview' && (
                        <ManageShopOrder
                           handleOnSubmitComment={handleOnSubmitComment}
                           myProductInOrder={myProductInOrder}
                           handleAcceptOrder={handleAcceptOrder}
                           handleDeclineOrder={handleDeclineOrder}
                           handleOrderUserNotCome={handleOrderUserNotCome}
                           handlePaidOrder={handlePaidOrder}
                           handleBackOrder={handleBackOrder}
                           newComment={newComment}
                           handlePageChange={handlePageChange}
                        />
                     )}
                  </Content>
               </Col>
            </Row>
         </Layout>
      </div>
   );
}

export default ManageShopPage;
