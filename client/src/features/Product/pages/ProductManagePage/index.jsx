import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/orderApi';
import ProductManageAvatar from '../../components/ProductManageAvatar';
import ProductManageTable from '../../components/ProductManageTable';
import ProductManageTitle from '../../components/ProductManageTitle';

function ProductManagePage(props) {
   const userId = useSelector((state) => state.users.id);
   const userAvatar = useSelector((state) => state.users.photoURL);
   const username = useSelector((state) => state.users.username);
   const email = useSelector((state) => state.users.email);
   const phoneNumber = useSelector((state) => state.users.phoneNumber);

   const [orders, setOrders] = useState([]);
   const [current, setCurrent] = useState(0);

   useEffect(() => {
      if (!userId) return;

      const getOrdersByUserId = async () => {
         try {
            const query = {
               userId: userId,
               orderStatusId: current || null,
            };
            const response = await orderApi.manageOrder(query);
            console.log('Product by user Orders: ', response);
            setOrders(response);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdersByUserId();
   }, [userId, current]);

   const handleClickTitle = (id) => {
      setCurrent(id);
   };

   const handleClickDeleteOrderButton = async (orderId) => {
      try {
         const data = {
            orderId: orderId,
         };
         const response = await orderApi.deleteOrder(data);
         console.log('Removed order Successful: ', response);
         setOrders(orders.filter((o) => o.id !== response.id));
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <Row gutter={[12, 10]}>
            <Col span={5}>
               <ProductManageAvatar
                  userAvatar={userAvatar}
                  username={username}
                  email={email}
                  phoneNumber={phoneNumber}
               />
               <ProductManageTitle handleClickTitle={handleClickTitle} />
            </Col>
            <Col span={19}>
               {current >= 0 && current <= 5 && (
                  <ProductManageTable
                     orders={orders}
                     handleClickDeleteOrderButton={handleClickDeleteOrderButton}
                  />
               )}
            </Col>
         </Row>
      </div>
   );
}

export default ProductManagePage;
