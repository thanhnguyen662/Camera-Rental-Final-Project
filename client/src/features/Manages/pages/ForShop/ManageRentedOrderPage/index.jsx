import { RollbackOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../../api/orderApi';
import openNotificationWithIcon from '../../../../../components/Notification';
import ManageOrderTable from '../../../components/ManageOrderTable';
import { Link } from 'react-router-dom';
import { Avatar, Space, Typography, Button } from 'antd';

const { Text } = Typography;

function ManageRentedOrderPage(props) {
   const userId = useSelector((state) => state.users.id);

   const [rentedOrder, setRentedOrder] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
            userId: userId,
            statusName: 'RENTED',
            page: page,
         });
         setRentedOrder((prev) => [...prev, ...response]);
      };
      getMyOrderByStatus();
   }, [userId, page]);

   const handlePageChange = () => {
      setPage(page + 1);
   };

   const handleOnClickBackOrder = async (formData) => {
      try {
         const response = await orderApi.updateBack(formData);
         removeOrderFromTab(response);
         openNotificationWithIcon('success', response.message);

         await orderApi.updateUserSuccessStat({
            userId: response.userId,
         });
      } catch (error) {
         console.log(error);
      }
   };

   const removeOrderFromTab = (response) => {
      setRentedOrder((prev) => {
         const filter = prev.filter((o) => o.id !== response.id);
         return filter;
      });
   };

   const buttonGroup = (order) => {
      return (
         <Space>
            <Button
               className='footerButton'
               style={{ border: '1px solid #1890FF', color: '#1890FF' }}
               icon={<RollbackOutlined />}
               onClick={() => handleOnClickBackOrder({ orderId: order.id })}
            >
               Product Back
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
            dataSource={rentedOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            userTitleTable={userTitleTable}
            tag='RENTED'
            tagColor='orange'
         />
      </>
   );
}

export default ManageRentedOrderPage;
