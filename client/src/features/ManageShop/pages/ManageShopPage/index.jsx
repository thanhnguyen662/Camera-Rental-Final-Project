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
            current !== 'SUCCESS' &&
            current !== 'FAILURE'
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

   const handleUpdateOrder = async (values) => {
      let array = [];
      console.log('values: ', values);
      try {
         const response = await orderApi.updateOrder({
            orderId: values.orderId,
            orderStatusId: values.orderStatusId,
            orderItems: values.orderItems,
            note: values.note ? values.note : null,
            paidAt: values.paidAt,
         });
         console.log('Updated: ', response);

         const filterOldData = myProductInOrder.filter(
            (o) => o.id !== response.id
         );
         array = filterOldData;
         array.unshift(response);

         setMyProductInOrder(array);
      } catch (error) {
         console.log(error);
      }
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
                           handleUpdateOrder={handleUpdateOrder}
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
