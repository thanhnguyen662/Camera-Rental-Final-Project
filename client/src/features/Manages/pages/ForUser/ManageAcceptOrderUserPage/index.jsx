import { Avatar, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import orderApi from '../../../../../api/orderApi';
import ManageOrderTable from '../../../components/ManageOrderTable';

const { Text } = Typography;

function ManageAcceptOrderUserPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [page, setPage] = useState(1);
   const [acceptOrder, setAcceptOrder] = useState([]);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getMyOrder({
            userId: userId,
            statusName: 'ACCEPT',
            page: page,
         });
         setAcceptOrder((prev) => [...prev, ...response]);
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
            dataSource={acceptOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            userTitleTable={userTitleTable}
            tag='ACCEPT'
            tagColor='green'
         />
      </>
   );
}

export default ManageAcceptOrderUserPage;
