import { Col, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/orderApi';
import productApi from '../../../../api/productApi';
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
   const [myProduct, setMyProduct] = useState([]);

   const userId = useSelector((state) => state.users.id);

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
         if (
            current !== 'overview' &&
            current !== 'ALL' &&
            current !== 'PENDING' &&
            current !== 'ACCEPT' &&
            current !== 'RENTED' &&
            current !== 'FAILURE' &&
            current !== 'BACK'
         )
            return;
         try {
            const response = await orderApi.myProductInOrder({
               firebaseId: userId,
               orderStatus:
                  current === 'ALL' || current === 'overview' ? null : current,
            });
            setMyProductInOrder(response);
            console.log('My Product In Order: ', response);
         } catch (error) {
            console.log(error);
         }
      };
      getMyProductInOrder();
   }, [userId, current]);

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
                           allMyProductInOrder={myProductInOrder}
                           setCurrent={setCurrent}
                        />
                     )}
                     {current === 'allProduct' && (
                        <ManageShopProductTable myProduct={myProduct} />
                     )}
                     {current !== 'allProduct' && current !== 'overview' && (
                        <ManageShopOrder
                           myProductInOrder={myProductInOrder}
                           handleAcceptOrder={handleAcceptOrder}
                           handleDeclineOrder={handleDeclineOrder}
                           handleOrderUserNotCome={handleOrderUserNotCome}
                           handlePaidOrder={handlePaidOrder}
                           handleBackOrder={handleBackOrder}
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
