import { Col, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import categoryApi from '../../../../api/categoryApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ProfileProductUser from '../../../Profile/components/ProfileProductUser';
import './CategoryPage.scss';

function CategoryPage(props) {
   const { categoryName } = useParams();
   const [category, setCategory] = useState([]);

   useEffect(() => {
      const getProductCategoryInDb = async () => {
         const response = await categoryApi.getProductInCategory({
            name: categoryName,
         });
         console.log('category', response);
         setCategory(response);
      };
      getProductCategoryInDb();
   }, [categoryName]);

   return (
      <>
         <div className='categoryPage'>
            <BreadcrumbBar />
            <Row gutter={[20, 20]}>
               <Col span={5}>h1</Col>
               <Col span={19}>
                  <Row gutter={[28, 28]}>
                     {category[0]?.Product.map((c) => (
                        <div key={category.id}>
                           <Col flex='none'>
                              <ProfileProductUser product={c} />
                           </Col>
                        </div>
                     ))}
                  </Row>
               </Col>
            </Row>
            <div className='categoryPagination'>
               <Pagination defaultCurrent={1} total={50} />
            </div>
         </div>
      </>
   );
}

export default CategoryPage;
