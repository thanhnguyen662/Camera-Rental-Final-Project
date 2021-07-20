import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cartApi from '../../../../api/cartApi';
import productApi from '../../../../api/productApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ProductDetailComment from '../../components/ProductDetailComment';
import ProductDetailDescription from '../../components/ProductDetailDescription';
import ProductDetailImage from '../../components/ProductDetailImage';
import ProductDetailUser from '../../components/ProductDetailUser';
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
   }, [slug]);

   useEffect(() => {
      window.scrollTo(0, 0);
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
         <div
            className='productDetailCard'
            style={{ overflow: 'hidden', height: '100%' }}
         >
            <BreadcrumbBar
               productName={productDetail?.name}
               className='breadcrumbBar'
            />
            <Row span={24} gutter={[45, 0]}>
               <Col span={11} className='rowImage'>
                  <ProductDetailImage productDetail={productDetail} />
               </Col>
               <Col span={13} className='product'>
                  <ProductDetailDescription
                     productDetail={productDetail}
                     onClickToAddProduct={handleOnClickToAddProduct}
                  />
               </Col>
            </Row>

            <ProductDetailUser productDetail={productDetail} />

            <ProductDetailComment productDetail={productDetail} />
         </div>
      </>
   );
}

export default ProductDetailPage;
