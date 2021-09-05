import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../../api/orderApi';
import ManageOrderTable from '../../../components/ManageOrderTable';
import { Link } from 'react-router-dom';
import { Avatar, Space, Typography } from 'antd';

const { Text } = Typography;

function ManageFailureOrderPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [failureOrder, setFailureOrder] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
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

export default ManageFailureOrderPage;
