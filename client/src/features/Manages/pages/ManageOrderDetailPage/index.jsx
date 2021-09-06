import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import orderApi from '../../../../api/orderApi';
import OrderDetailContent from '../../components/OrderDetailContent';
import OrderDetailHeader from '../../components/OrderDetailHeader';
import OrderDetailItemsTable from '../../components/OrderDetailItemsTable';
import openNotificationWithIcon from '../../../../components/Notification';
import './OrderDetailPage.scss';

function ManageOrderDetailPage(props) {
   const userId = useSelector((state) => state.users.id);
   const { orderId } = useParams();

   const [orderDetail, setOrderDetail] = useState({});
   const [partnerId, setPartnerId] = useState('');
   const [myRole, setMyRole] = useState('');
   const [reloadComment, setReloadComment] = useState(0);

   useEffect(() => {
      if (!userId) return;
      const getOrder = async () => {
         const response = await orderApi.getOrderById({ orderId });
         setOrderDetail(response);

         const userArray = [
            {
               role: 'buyer',
               id: response.User.firebaseId,
            },
            {
               role: 'seller',
               id: response.orderItems[0].Product.User.firebaseId,
            },
         ];

         const filterPartnerId = userArray.find((u) => u.id !== userId);
         setPartnerId(filterPartnerId.id);
         const filterMyRole = userArray.find((u) => u.id === userId);
         setMyRole(filterMyRole.role);
      };
      getOrder();
   }, [orderId, userId]);

   const handleSubmitComment = (data) => {
      const formData = {
         ...data,
         authorId: userId,
         userId: partnerId,
         orderId: orderDetail.id,
      };
      if (myRole === 'seller') return commentBySeller(formData);
      if (myRole === 'buyer') return createUserCommentByBuyer(formData);
   };

   const commentBySeller = async (formData) => {
      try {
         const response = await orderApi.createUserCommentBySeller(formData);
         openNotificationWithIcon(response.type, response.message);
         setReloadComment(reloadComment + 1);
      } catch (error) {
         console.log(error);
      }
   };

   const createUserCommentByBuyer = async (formData) => {
      try {
         const response = await orderApi.createUserCommentByBuyer(formData);
         openNotificationWithIcon(response.type, response.message);
         setReloadComment(reloadComment + 1);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div
            style={{ background: 'white', padding: '20px', borderRadius: 10 }}
         >
            <div>
               <OrderDetailHeader orderDetail={orderDetail} />
            </div>
            <div>
               <OrderDetailContent
                  orderDetail={orderDetail}
                  partnerId={partnerId}
                  handleSubmitComment={handleSubmitComment}
                  reloadComment={reloadComment}
               />
            </div>
            <div>
               <OrderDetailItemsTable
                  dataSource={orderDetail}
                  myRole={myRole}
               />
            </div>
         </div>
      </>
   );
}

export default ManageOrderDetailPage;
