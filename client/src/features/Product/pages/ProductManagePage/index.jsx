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

   useEffect(() => {
      if (!userId) return;

      const getOrdersByUserId = async () => {
         try {
            const response = await orderApi.manageOrder(userId);
            console.log('Product by user Orders: ', response);
            setOrders(response);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdersByUserId();
   }, [userId]);

   return (
      <div>
         <Row gutter={[10, 10]}>
            <Col span={5}>
               <ProductManageAvatar
                  userAvatar={userAvatar}
                  username={username}
                  email={email}
                  phoneNumber={phoneNumber}
               />
               <ProductManageTitle />
            </Col>
            <Col span={19}>
               <ProductManageTable orders={orders} />
            </Col>
         </Row>
      </div>
   );
}

export default ProductManagePage;
