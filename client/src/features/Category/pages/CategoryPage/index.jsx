import { Col, Button, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import categoryApi from '../../../../api/categoryApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import CategoryContent from '../../components/CategoryContent';
import CategoryMenu from '../../components/CategoryMenu';
import CategorySidebar from '../../components/CategorySidebar';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
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
   const [isMore, setIsMore] = useState(true);

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
         console.log(response);
         response[0].Product.length >= 10 ? setIsMore(true) : setIsMore(false);
         setCategory(response);
      };
      getProductCategoryInDb();
   }, [categoryName, sortBy, page, brand, rate, submitMinMax, selectProvince]);

   const pagination = () => {
      return (
         <Space>
            <Button
               onClick={() => setPage(page - 1)}
               icon={<ArrowLeftOutlined />}
               disabled={page <= 1 ? true : false}
            />
            <Button
               disabled={!isMore ? true : false}
               onClick={() => setPage(page + 1)}
               icon={<ArrowRightOutlined />}
            />
         </Space>
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
