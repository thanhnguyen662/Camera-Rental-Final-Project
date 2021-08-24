import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import searchApi from '../../../../api/searchApi';
import ProductCard from '../../../Product/components/ProductCard';

function SearchPage(props) {
   const { keyword } = useParams();
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const searchByKeyword = async () => {
         const response = await searchApi.result({
            keyword: keyword,
         });
         setProducts(response);
         console.log('searchResult: ', response);
      };

      searchByKeyword();
   }, [keyword]);

   return (
      <>
         <h1>Search result: "{keyword}"</h1>
         <ProductCard products={products} />
      </>
   );
}

export default SearchPage;
