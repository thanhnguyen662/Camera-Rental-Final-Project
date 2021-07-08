import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../../../api/cartApi';
import productApi from '../../../../api/productApi';
import ProductCard from '../../components/ProductCard';
import { addProductToCart } from '../../productSlice';

function ProductPage(props) {
   const [product, setProduct] = useState([]);
   const userId = useSelector((state) => state.users.id);
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

   const handleOnClickToAddProduct = async (product) => {
      const productToCart = addKeyToProduct(product);

      const action = addProductToCart(productToCart);
      dispatch(action);

      try {
         const data = {
            firebaseId: userId,
            productId: product.id,
         };
         const response = await cartApi.addMoreProductToCart(data);

         console.log('Add product to cart: ', response);
      } catch (error) {
         return console.log('Error: ', error);
      }
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
