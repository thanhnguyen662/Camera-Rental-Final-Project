import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import orderApi from '../../../../api/orderApi';
import OrderDetailContent from '../../components/OrderDetailContent';
import OrderDetailHeader from '../../components/OrderDetailHeader';
import OrderDetailItemsTable from '../../components/OrderDetailItemsTable';
import './OrderDetailPage.scss';

function ManageOrderDetailPage(props) {
   const userId = useSelector((state) => state.users.id);
   const { orderId } = useParams();

   const [orderDetail, setOrderDetail] = useState({});
   const [partnerId, setPartnerId] = useState('');

   useEffect(() => {
      if (!userId) return;
      const getOrder = async () => {
         const response = await orderApi.getOrderById({ orderId });
         console.log(response);

         const userArray = [
            response.User.firebaseId,
            response.orderItems[0].Product.User.firebaseId,
         ];

         const filterPartnerId = userArray.find((id) => id !== userId);
         setPartnerId(filterPartnerId);

         setOrderDetail(response);
      };
      getOrder();
   }, [orderId, userId]);

   return (
      <>
         <div>
            <OrderDetailHeader orderDetail={orderDetail} />
         </div>
         <div>
            <OrderDetailContent
               orderDetail={orderDetail}
               partnerId={partnerId}
            />
         </div>
         <div>
            <OrderDetailItemsTable dataSource={orderDetail} />
         </div>
      </>
   );
}

export default ManageOrderDetailPage;
