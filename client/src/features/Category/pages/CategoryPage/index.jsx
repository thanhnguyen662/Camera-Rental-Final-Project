import React, { useEffect, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';
import { useParams } from 'react-router-dom';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import './CategoryPage.scss';
import ProductCard from '../../../Product/components/ProductCard';

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
         <BreadcrumbBar />
         <div className='categoryPage'>
            <ProductCard products={category[0]?.Product} />
         </div>
      </>
   );
}

export default CategoryPage;
