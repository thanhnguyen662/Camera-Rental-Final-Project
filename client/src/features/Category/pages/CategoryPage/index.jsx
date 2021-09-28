import { Col, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import categoryApi from '../../../../api/categoryApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import CategoryContent from '../../components/CategoryContent';
import CategoryMenu from '../../components/CategoryMenu';
import CategorySidebar from '../../components/CategorySidebar';
import './CategoryPage.scss';

function CategoryPage(props) {
   const { categoryName, sortBy } = useParams();
   const history = useHistory();

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
            take: 2,
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
            pageSize={2}
            current={page}
            onChange={(e) => handlePageChange(e)}
         />
      );
   };

   const handleSelectedBrand = (selected) => {
      setPage(1);
      setBrand(selected);
   };

   const handleSelectedRate = (selected) => {
      setPage(1);
      setRate(selected);
   };

   const handleSubmitMinMax = (minMax) => {
      setPage(1);
      setSubmitMinMax(minMax);
   };

   const handleSelectedProvince = (selected) => {
      setPage(1);
      setSelectProvince(selected);
   };

   const handleSelectedMenuItem = (selected) => {
      setPage(1);
      history.push(`/category/${categoryName}/${selected}`);
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
                     handleSelectedProvince={handleSelectedProvince}
                  />
               </Col>
               <Col span={21}>
                  <div style={{ margin: '5px 0 15px' }}>
                     <CategoryMenu
                        sortBy={sortBy}
                        pagination={pagination}
                        handleSelectedMenuItem={handleSelectedMenuItem}
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
