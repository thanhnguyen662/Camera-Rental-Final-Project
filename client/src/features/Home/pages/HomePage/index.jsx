import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import categoryApi from '../../../../api/categoryApi';
import productApi from '../../../../api/productApi';
import CarouselBar from '../../../../components/CarouselBar';
import ProductCard from '../../../Product/components/ProductCard';
import Promotion from '../../../Promotion';
import CategoryBar from '../../components/CategoryBar';
import NewProduct from '../../components/NewProduct';
import './HomePage.scss';

HomePage.propTypes = {};

function HomePage(props) {
   const [page, setPage] = useState(1);
   const [isMore, setIsMore] = useState(true);
   const [categories, setCategories] = useState([]);
   const [topRenting, setTopRenting] = useState([]);
   const [products, setProducts] = useState([]);

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

   useEffect(() => {
      const getAllProduct = async () => {
         try {
            console.log(page);
            const response = await productApi.getAllProducts({
               page: page,
               take: 5,
            });
            response.length ? setIsMore(true) : setIsMore(false);
            console.log(response);
            setProducts((prev) => [...prev, ...response]);
         } catch (error) {
            console.error(error);
         }
      };
      getAllProduct();
   }, [page]);

   const handlePageChange = () => {
      setPage(page + 1);
   };

   return (
      <>
         <div>
            <CarouselBar />
         </div>
         <div>
            <CategoryBar categories={categories} />
         </div>
         <div>
            <h1 style={{ marginTop: '45px' }}>Popular Products</h1>
            <ProductCard products={topRenting} />
         </div>
         <div>
            <h1 style={{ marginTop: '70px' }}>Active Promotions</h1>
            <Promotion />
         </div>
         <div>
            <h1 style={{ marginTop: '70px' }}>New Products</h1>
            <NewProduct />
         </div>
         <div>
            <h1 style={{ marginTop: '70px' }}>Suggestions</h1>
            <InfiniteScroll
               dataLength={products.length}
               next={() => handlePageChange()}
               hasMore={isMore}
               style={{ overflow: 'hidden' }}
               endMessage={<div>End</div>}
            >
               <ProductCard products={products} />
            </InfiniteScroll>
         </div>
      </>
   );
}

export default HomePage;
