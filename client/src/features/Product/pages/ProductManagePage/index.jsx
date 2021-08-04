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
   const [current, setCurrent] = useState(1);

   useEffect(() => {
      if (!userId) return;

      const getOrdersByUserId = async () => {
         const status = 'PENDING';
         try {
            const response = await orderApi.manageOrder({ userId, status });
            console.log('Product by user Orders: ', response);
            setOrders(response);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdersByUserId();
   }, [userId]);

   console.log(current);

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
               <ProductManageTitle setCurrent={setCurrent} />
            </Col>
            <Col span={19}>
               {current === 1 && <ProductManageTable orders={orders} />}
            </Col>
         </Row>
      </div>
   );
}

export default ProductManagePage;
