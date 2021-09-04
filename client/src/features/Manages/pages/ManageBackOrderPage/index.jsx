import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/orderApi';
import ManageOrderTable from '../../components/ManageOrderTable';

function ManageBackOrderPage(props) {
   const userId = useSelector((state) => state.users.id);
   const [backOrder, setBackOrder] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
            userId: userId,
            statusName: 'PENDING',
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

   return (
      <>
         <ManageOrderTable
            dataSource={backOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            tag='BACK'
            tagColor='purple'
         />
      </>
   );
}

export default ManageBackOrderPage;
