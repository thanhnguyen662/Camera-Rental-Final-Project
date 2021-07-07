import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import productApi from '../../../../api/productApi';
import ProductCard from '../../components/ProductCard';
import { addProductToCart } from '../../productSlice';

function ProductPage(props) {
   const [product, setProduct] = useState([]);
   const dispatch = useDispatch();

   useEffect(() => {
      async function getProduct() {
         const response = await productApi.getAllProducts();
         setProduct(response);
      }
      getProduct();
   }, []);

   const addKeyToProduct = (product) => {
      const split = { ...product };
      split.key = product.id;

      return split;
   };

   const handleOnClickToAddProduct = (product) => {
      const productToCart = addKeyToProduct(product);

      const action = addProductToCart(productToCart);
      dispatch(action);
   };

   return (
      <>
         <ProductCard
            products={product}
            onClickToAddProduct={handleOnClickToAddProduct}
         />
      </>
   );
}

export default ProductPage;
