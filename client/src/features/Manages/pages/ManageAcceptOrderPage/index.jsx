import React, { useEffect, useState } from 'react';
import { DollarCircleOutlined, FrownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Button, Space } from 'antd';
import ManageOrderTable from '../../components/ManageOrderTable';
import orderApi from '../../../../api/orderApi';
import openNotificationWithIcon from '../../../../components/Notification';

function ManageAcceptOrderPage(props) {
   const userId = useSelector((state) => state.users.id);

   const [acceptOrder, setAcceptOrder] = useState([]);
   const [page, setPage] = useState(1);

   useEffect(() => {
      if (!userId) return;
      const getMyOrderByStatus = async () => {
         const response = await orderApi.getOrderByStatus({
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

   const handleOnClickPaidOrder = async (formData) => {
      try {
         const response = await orderApi.updateRented(formData);
         removeOrderFromTab(response);
         openNotificationWithIcon('success', response.message);

         await orderApi.updateUserComeStat({
            userId: response.userId,
         });
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnClickUserNotCome = async (formData) => {
      try {
         const response = await orderApi.updateFailure(formData);
         removeOrderFromTab(response);
         openNotificationWithIcon('success', response.message);

         await orderApi.updateUserComeStat({
            userId: response.userId,
         });
      } catch (error) {
         console.log(error);
      }
   };

   const removeOrderFromTab = (response) => {
      setAcceptOrder((prev) => {
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
               icon={<DollarCircleOutlined />}
               onClick={() => handleOnClickPaidOrder({ orderId: order.id })}
            >
               Paid
            </Button>
            <Button
               danger
               className='footerButton'
               icon={<FrownOutlined />}
               onClick={() =>
                  handleOnClickUserNotCome({
                     orderId: order.id,
                     note: 'NotCome',
                  })
               }
            >
               Not Come
            </Button>
         </Space>
      );
   };

   return (
      <>
         <ManageOrderTable
            dataSource={acceptOrder}
            buttonGroup={buttonGroup}
            handlePageChange={handlePageChange}
            tag='ACCEPT'
            tagColor='green'
         />
      </>
   );
}

export default ManageAcceptOrderPage;
