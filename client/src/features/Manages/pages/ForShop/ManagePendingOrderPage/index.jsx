import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import orderApi from '../../../../../api/orderApi';
import openNotificationWithIcon from '../../../../../components/Notification';
import ManageOrderTable from '../../../components/ManageOrderTable';

const { Text } = Typography;

function ManagePendingOrderPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [pendingOrder, setPendingOrder] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
            userId: userId,
            statusName: 'PENDING',
            page: page,
         });
         setPendingOrder((prev) => [...prev, ...response]);
      };
      getMyOrderByStatus();
   }, [userId, page]);

   const handlePageChange = () => {
      setPage(page + 1);
   };

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

   const buttonGroup = (order) => {
      return (
         <Space>
            <Button
               type='primary'
               className='footerButton'
               icon={<CheckOutlined />}
               onClick={() => handleOnClickAcceptOrder({ orderId: order.id })}
            >
               Accept
            </Button>
            <Button
               type='danger'
               className='footerButton'
               icon={<CloseOutlined />}
               onClick={() =>
                  handleOnClickDeclineOrder({
                     orderId: order.id,
                     note: 'Decline',
                  })
               }
            >
               Decide
            </Button>
         </Space>
      );
   };

   const userTitleTable = (order) => {
      return (
         <Link to={`/profile/${order.User.firebaseId}`}>
            <Space size={20}>
               <Avatar src={order.User.photoURL} />
               <Text strong>{order.User.username}</Text>
            </Space>
         </Link>
      );
   };

   return (
      <>
         <ManageOrderTable
            dataSource={pendingOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            userTitleTable={userTitleTable}
            tag='PENDING'
            tagColor='blue'
         />
      </>
   );
}

export default ManagePendingOrderPage;
