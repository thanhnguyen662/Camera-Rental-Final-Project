import { Avatar, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import orderApi from '../../../../../api/orderApi';
import ManageOrderTable from '../../../components/ManageOrderTable';

const { Text } = Typography;

function ManageFailureOrderUserPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [page, setPage] = useState(1);
   const [failureOrder, setFailureOrder] = useState([]);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getMyOrder({
            userId: userId,
            statusName: 'FAILURE',
            page: page,
         });
         setFailureOrder((prev) => [...prev, ...response]);
      };
      getMyOrderByStatus();
   }, [userId, page]);

   const handlePageChange = () => {
      setPage(page + 1);
   };

   const buttonGroup = () => {
      return <div></div>;
   };

   const userTitleTable = (order) => {
      return (
         <Link to={`/profile/${order.orderItems[0]?.Product.User.firebaseId}`}>
            <Space size={20}>
               <Avatar src={order.orderItems[0]?.Product.User.photoURL} />
               <Text strong>{order.orderItems[0]?.Product.User.username}</Text>
            </Space>
         </Link>
      );
   };

   return (
      <>
         <ManageOrderTable
            dataSource={failureOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            userTitleTable={userTitleTable}
            tag='FAILURE'
            tagColor='red'
         />
      </>
   );
}

export default ManageFailureOrderUserPage;
