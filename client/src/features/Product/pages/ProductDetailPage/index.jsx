import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cartApi from '../../../../api/cartApi';
import productApi from '../../../../api/productApi';
import ProductDetail from '../../components/ProductDetail';
import { addProductToCart } from '../../productSlice';

function ProductDetailPage(props) {
   const { slug } = useParams();
   const dispatch = useDispatch();

   const [productDetail, setProductDetail] = useState();
   const userId = useSelector((state) => state.users.id);

   useEffect(() => {
      const getProductDetail = async () => {
         try {
            const response = await productApi.getProductDetail(slug);
            setProductDetail(response);

            console.log(response);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getProductDetail();
      // eslint-disable-next-line
   }, []);

   const addKeyToProduct = (product) => {
      const split = { ...product };
      split.key = product.id;

      return split;
   };

   const handleOnClickToAddProduct = async (product) => {
      console.log('product', product);
      const productToCart = addKeyToProduct(product);
      const action = addProductToCart(productToCart);
      dispatch(action);

      try {
         const data = {
            firebaseId: userId,
            productId: product.id,
            startDate: product.startDate,
            endDate: product.endDate,
         };

         const response = await cartApi.addMoreProductToCart(data);
         console.log('Add product to cart: ', response);
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <>
         <ProductDetail
            productDetail={productDetail}
            onClickToAddProduct={handleOnClickToAddProduct}
         />
      </>
   );
}

export default ProductDetailPage;
