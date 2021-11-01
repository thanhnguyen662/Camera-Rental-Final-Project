import React, { useEffect, useState } from 'react';
import adminApi from '../../../../api/adminApi';
import ManageProductTable from '../../components/ManageProductTable';

function AdminPage(props) {
   const [manageProduct, setManageProduct] = useState([]);
   const [page, setPage] = useState(1);
   const [isMore, setIsMore] = useState(true);
   const [searchFormData, setSearchFormData] = useState({
      type: 'product',
      keyword: '',
   });

   useEffect(() => {
      const getProductManage = async () => {
         const response = await adminApi.adminManageProduct({
            ...searchFormData,
            page: page,
            take: 10,
         });
         console.log('response: ', response);
         response?.length < 10 ? setIsMore(false) : setIsMore(true);
         setManageProduct(response);
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
            />
         </div>
      </>
   );
}

export default AdminPage;
