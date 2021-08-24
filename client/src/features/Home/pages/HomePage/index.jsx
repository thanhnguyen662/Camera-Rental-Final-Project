import React, { useEffect, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';
import productApi from '../../../../api/productApi';
import CarouselBar from '../../../../components/CarouselBar';
import ProductCard from '../../../Product/components/ProductCard';
import Promotion from '../../../Promotion';
import CategoryBar from '../../components/CategoryBar';
import './HomePage.scss';

HomePage.propTypes = {};

function HomePage(props) {
   const [categories, setCategories] = useState([]);
   const [topRenting, setTopRenting] = useState([]);

   useEffect(() => {
      const getCategoryInDb = async () => {
         const response = await categoryApi.getCategory();
         setCategories(response);
      };
      getCategoryInDb();
   }, []);

   useEffect(() => {
      const getTopRentingInDb = async () => {
         const response = await productApi.topRenting();
         setTopRenting(response);
      };
      getTopRentingInDb();
   }, []);

   return (
      <>
         <div>
            <CarouselBar />
         </div>
         <div>
            <CategoryBar categories={categories} />
         </div>
         <div>
            <h1 style={{ marginTop: '45px' }}>Best Choice</h1>
            <ProductCard products={topRenting} />
         </div>
         <div>
            <h1 style={{ marginTop: '70px' }}>Active Promotions</h1>
            <Promotion />
         </div>
      </>
   );
}

export default HomePage;
