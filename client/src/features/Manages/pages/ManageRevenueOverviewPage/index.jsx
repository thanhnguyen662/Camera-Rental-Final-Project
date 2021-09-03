import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import orderApi from '../../../../api/orderApi';
import RevenueChart from '../../components/RevenueChart';
import RevenueOrderGrid from '../../components/RevenueOrderGird';
import RevenueSelectDate from '../../components/RevenueSelectDate';
import OrderCreateChart from '../../components/OrderCreateChart';

function ManageForShop(props) {
   const userId = useSelector((state) => state.users.id);
   const [countMyOrder, setCountMyOrder] = useState([]);
   const [revenueByDate, setRevenueByDate] = useState([]);
   const [createByDate, setCreateByDate] = useState([]);
   const [today] = useState(moment().format('YYYY-MM-DD'));

   useEffect(() => {
      if (!userId) return;
      const getCountMyOrder = async () => {
         const response = await orderApi.countMyOrder({
            userId: userId,
         });
         setCountMyOrder(response);
      };
      getCountMyOrder();
   }, [userId]);

   const handleDatePickerChange = async (formData) => {
      try {
         const getRevenueInTime = await orderApi.getRevenueInTime(formData);
         setRevenueByDate(getRevenueInTime);

         const getOrderCreateInTime = await orderApi.getCreateInTime(formData);
         setCreateByDate(getOrderCreateInTime);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div>
            <RevenueOrderGrid countMyOrder={countMyOrder} />
            <Divider />
            <RevenueSelectDate
               handleDatePickerChange={handleDatePickerChange}
               userId={userId}
            />
            <Divider style={{ marginTop: 10 }} />
            <RevenueChart revenueByDate={revenueByDate} today={today} />
            <Divider />
            <OrderCreateChart createByDate={createByDate} today={today} />
         </div>
      </>
   );
}

export default ManageForShop;
