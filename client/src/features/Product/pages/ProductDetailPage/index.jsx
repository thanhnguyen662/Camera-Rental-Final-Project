import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cartApi from '../../../../api/cartApi';
import productApi from '../../../../api/productApi';
import userApi from '../../../../api/userApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ProductDetailComment from '../../components/ProductDetailComment';
import ProductDetailDescription from '../../components/ProductDetailDescription';
import ProductDetailImage from '../../components/ProductDetailImage';
import ProductDetailUser from '../../components/ProductDetailUser';
import { addProductToCart } from '../../productSlice';

function ProductDetailPage(props) {
   const { slug } = useParams();
   const dispatch = useDispatch();

   const userId = useSelector((state) => state.users.id);

   const [productDetail, setProductDetail] = useState();
   const [orderInToday, setOrderInToday] = useState([]);
   const [myProduct, setMyProduct] = useState(0);
   const [myStats, setMyStats] = useState({});

   useEffect(() => {
      const getProductDetail = async () => {
         try {
            const response = await productApi.getProductDetail(slug);
            setProductDetail(response);

            const productOfMe = await productApi.getMyProduct({
               firebaseId: response.User.firebaseId,
            });
            setMyProduct(productOfMe.length);

            const statsOfMe = await userApi.getUserStats({
               userId: response.User.firebaseId,
            });
            setMyStats(statsOfMe);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getProductDetail();
   }, [slug]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => {
      const getOrderProductInToday = async () => {
         const response = await productApi.orderItemsIncludeProduct({
            slug: slug,
            date: moment().format('YYYY-MM-DD'),
         });
         setOrderInToday(response);
      };
      getOrderProductInToday();
   }, [slug]);

   const handleOnClickToAddProduct = async (product) => {
      try {
         const data = {
            firebaseId: userId,
            productId: product.id,
            startDate: product.startDate,
            endDate: product.endDate,
         };

         const response = await cartApi.addMoreProductToCart(data);
         console.log('Add product to cart: ', response);

         if (response.message === 'Product already in cart') return;
         const action = addProductToCart(response);
         dispatch(action);
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <div className='productDetailCard' style={{ height: '100%' }}>
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
                  orderInToday={orderInToday}
               />
            </Col>
         </Row>
         <ProductDetailUser
            productDetail={productDetail}
            myProduct={myProduct}
            myStats={myStats}
         />
         <ProductDetailComment productDetail={productDetail} />
      </div>
   );
}

export default ProductDetailPage;
