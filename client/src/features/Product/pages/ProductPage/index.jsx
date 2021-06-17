import React, { useState } from 'react';
import { useEffect } from 'react';
import productApi from '../../../../api/productApi';
import ProductCard from '../../components/ProductCard';

function ProductPage(props) {
   const [product, setProduct] = useState([]);

   useEffect(() => {
      async function getProduct() {
         const response = await productApi.getAllProducts();

         setProduct(response);
      }
      getProduct();
   }, []);

   return (
      <>
         <ProductCard products={product} />
      </>
   );
}

export default ProductPage;
