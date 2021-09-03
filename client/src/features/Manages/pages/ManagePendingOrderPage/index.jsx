import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/orderApi';
import openNotificationWithIcon from '../../../../components/Notification';
import ManagePendingOrder from '../../components/ManagePendingOrder';
import './ManagePendingOrderPage.scss';

ManagePendingOrderPage.propTypes = {};

function ManagePendingOrderPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [pendingOrder, setPendingOrder] = useState([]);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
            userId: userId,
            statusName: 'PENDING',
         });
         setPendingOrder(response);
      };
      getMyOrderByStatus();
   }, [userId]);

   const handleOnClickAcceptOrder = async (formData) => {
      const response = await orderApi.updateAccept(formData);
      removePendingOrderFromPendingTab(response);
      openNotificationWithIcon('success', response.message);
   };

   const handleOnClickDeclineOrder = async (formData) => {
      const response = await orderApi.updateFailure(formData);
      removePendingOrderFromPendingTab(response);
      openNotificationWithIcon('success', response.message);
   };

   const removePendingOrderFromPendingTab = (response) => {
      setPendingOrder((prev) => {
         const filter = prev.filter((o) => o.id !== response.id);
         return filter;
      });
   };

   return (
      <>
         <ManagePendingOrder
            pendingOrder={pendingOrder}
            handleOnClickAcceptOrder={handleOnClickAcceptOrder}
            handleOnClickDeclineOrder={handleOnClickDeclineOrder}
         />
      </>
   );
}

export default ManagePendingOrderPage;
