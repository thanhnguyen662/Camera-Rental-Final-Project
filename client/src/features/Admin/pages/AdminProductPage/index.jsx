import React, { useEffect, useState } from 'react';
import adminApi from '../../../../api/adminApi';
import ManageProductTable from '../../components/ManageProductTable';
import moment from 'moment';

function AdminPage(props) {
   const [manageProduct, setManageProduct] = useState([]);
   const [page, setPage] = useState(1);
   const [isMore, setIsMore] = useState(true);
   const [searchFormData, setSearchFormData] = useState({
      type: 'product',
      keyword: '',
      rangeDate: [moment().subtract(100, 'days'), moment()],
      status: 'all',
      sortDate: 'desc',
   });

   useEffect(() => {
      const getProductManage = async () => {
         try {
            const response = await adminApi.adminManageProduct({
               ...searchFormData,
               page: page,
               take: 10,
            });
            console.log('response: ', response);
            response?.length < 10 ? setIsMore(false) : setIsMore(true);
            setManageProduct(response);
         } catch (error) {
            console.log(error);
         }
      };
      getProductManage();
   }, [searchFormData, page]);

   const handleSearch = async (key, value) => {
      setSearchFormData({
         ...searchFormData,
         [key]: value,
      });
   };

   const handleChangePage = (isChange) => {
      if (isChange === 'decrease') return setPage(page - 1);
      setPage(page + 1);
   };

   const handleClickActionButton = async (action, productId) => {
      try {
         const response = await adminApi.adminApproveProduct({
            action,
            productId,
         });
         setManageProduct((prev) => {
            const findIndex = prev.findIndex((item) => item.id === productId);
            prev[findIndex].publicStatus = response.publicStatus;
            return [...prev];
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div>
            <ManageProductTable
               manageProduct={manageProduct}
               searchFormData={searchFormData}
               onSearch={handleSearch}
               onChangePage={handleChangePage}
               page={page}
               isMore={isMore}
               onClickActionButton={handleClickActionButton}
            />
         </div>
      </>
   );
}

export default AdminPage;
