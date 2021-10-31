import React, { useEffect, useState } from 'react';
import adminApi from '../../../../api/adminApi';
import ManageProductTable from '../../components/ManageProductTable';
import { Row, Col } from 'antd';

function AdminPage(props) {
   const [manageProduct, setManageProduct] = useState([]);

   useEffect(() => {
      const getRevenueAnalytics = async () => {
         const response = await adminApi.revenueAnalytics();
         console.log('getRevenueAnalytics: ', response);
      };
      getRevenueAnalytics();
   }, []);

   useEffect(() => {
      const getOrderAnalytics = async () => {
         const response = await adminApi.orderAnalytics();
         console.log('getOrderAnalytics: ', response);
      };
      getOrderAnalytics();
   }, []);

   useEffect(() => {
      const getProductManage = async () => {
         const response = await adminApi.adminManageProduct();
         setManageProduct(response);
      };
      getProductManage();
   }, []);

   return (
      <>
         <Row>
            <Col span={16}>
               <ManageProductTable manageProduct={manageProduct} />
            </Col>
         </Row>
      </>
   );
}

export default AdminPage;
