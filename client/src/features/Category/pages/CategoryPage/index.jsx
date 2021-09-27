import { Col, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import categoryApi from '../../../../api/categoryApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import CategoryContent from '../../components/CategoryContent';
import CategoryMenu from '../../components/CategoryMenu';
import CategorySidebar from '../../components/CategorySidebar';
import './CategoryPage.scss';

function CategoryPage(props) {
   const { categoryName, sortBy } = useParams();

   const [category, setCategory] = useState([]);
   const [page, setPage] = useState(1);
   const [brand, setBrand] = useState('');
   const [rate, setRate] = useState('All');
   const [submitMinMax, setSubmitMinMax] = useState({});
   const [selectProvince, setSelectProvince] = useState('global');

   useEffect(() => {
      const getProductCategoryInDb = async () => {
         const response = await categoryApi.getProductInCategory({
            name: categoryName,
            sortBy: sortBy,
            page: page,
            take: 10,
            searchByBrand: brand,
            searchByRate: rate,
            minPrice: submitMinMax.min,
            maxPrice: submitMinMax.max,
            province: selectProvince,
         });
         setCategory(response);
      };
      getProductCategoryInDb();
   }, [categoryName, sortBy, page, brand, rate, submitMinMax, selectProvince]);

   const handlePageChange = (e) => {
      setPage(e);
   };

   const pagination = (isSimple) => {
      return (
         <Pagination
            simple={isSimple}
            total={category[0]?._count.Product}
            pageSize={10}
            current={page}
            onChange={(e) => handlePageChange(e)}
         />
      );
   };

   const handleSelectedBrand = (selected) => {
      setBrand(selected);
   };

   const handleSelectedRate = (selected) => {
      setRate(selected);
   };

   const handleSubmitMinMax = (minMax) => {
      setSubmitMinMax(minMax);
   };

   const handleSelectedProvince = (selected) => {
      console.log(selected);
      setSelectProvince(selected);
   };

   return (
      <>
         <div className='categoryPage'>
            <BreadcrumbBar />
            <Row gutter={[15, 15]} style={{ marginTop: 5 }}>
               <Col span={3}>
                  <CategorySidebar
                     handleSelectedBrand={handleSelectedBrand}
                     handleSelectedRate={handleSelectedRate}
                     handleSubmitMinMax={handleSubmitMinMax}
                     selectProvince={selectProvince}
                     handleSelectedProvince={handleSelectedProvince}
                  />
               </Col>
               <Col span={21}>
                  <div style={{ margin: '5px 0 15px' }}>
                     <CategoryMenu
                        sortBy={sortBy}
                        categoryName={categoryName}
                        pagination={pagination}
                     />
                  </div>
                  <CategoryContent categoryProduct={category[0]?.Product} />
               </Col>
            </Row>
            <div className='categoryPagination'>{pagination(false)}</div>
         </div>
      </>
   );
}

export default CategoryPage;
