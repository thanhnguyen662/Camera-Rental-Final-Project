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

   useEffect(() => {
      const getProductCategoryInDb = async () => {
         const response = await categoryApi.getProductInCategory({
            name: categoryName,
            sortBy: sortBy,
            page: page,
            take: 10,
         });
         setCategory(response);
      };
      getProductCategoryInDb();
   }, [categoryName, sortBy, page]);

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

   return (
      <>
         <div className='categoryPage'>
            <BreadcrumbBar />
            <Row gutter={[15, 15]} style={{ marginTop: 5 }}>
               <Col span={3}>
                  <CategorySidebar />
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
