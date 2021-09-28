import { Button, Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import searchApi from '../../../../api/searchApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import CategoryContent from '../../../Category/components/CategoryContent';
import CategoryMenu from '../../../Category/components/CategoryMenu';
import CategorySidebar from '../../../Category/components/CategorySidebar';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './SearchPage.scss';

function SearchPage(props) {
   const { keyword, sortBy, type } = useParams();
   const history = useHistory();

   const [isMore, setIsMore] = useState(true);
   const [products, setProducts] = useState([]);
   const [page, setPage] = useState(1);
   const [brand, setBrand] = useState('');
   const [rate, setRate] = useState('All');
   const [submitMinMax, setSubmitMinMax] = useState({});
   const [selectProvince, setSelectProvince] = useState('global');

   useEffect(() => {
      const searchByKeyword = async () => {
         const response = await searchApi.result({
            keyword: keyword,
            sortBy: sortBy,
            page: page,
            take: 10,
            searchByBrand: brand,
            searchByRate: rate,
            minPrice: submitMinMax.min,
            maxPrice: submitMinMax.max,
            province: selectProvince,
         });
         response.length >= 10 ? setIsMore(true) : setIsMore(false);
         setProducts(response);
      };
      searchByKeyword();
   }, [keyword, sortBy, page, rate, brand, submitMinMax, selectProvince]);

   useEffect(() => {
      setRate('All');
      setBrand('');
      setSubmitMinMax({});
      setPage(1);
      setProducts([]);
   }, [keyword]);

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
      history.push(`/search/${type}/${keyword}/${selected}`);
   };

   return (
      <>
         <div className='searchPage'>
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
                  <CategoryContent categoryProduct={products} />
               </Col>
            </Row>

            <div className='searchPagination'>{pagination()}</div>
         </div>
      </>
   );
}

export default SearchPage;
