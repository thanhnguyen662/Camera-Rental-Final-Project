import { Avatar, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import orderApi from '../../../../../api/orderApi';
import ManageOrderTable from '../../../components/ManageOrderTable';

const { Text } = Typography;

function ManageBackOrderPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [backOrder, setBackOrder] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
            userId: userId,
            statusName: 'BACK',
            page: page,
         });
         setBackOrder((prev) => [...prev, ...response]);
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
            dataSource={backOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            userTitleTable={userTitleTable}
            tag='BACK'
            tagColor='purple'
         />
      </>
   );
}

export default ManageBackOrderPage;
