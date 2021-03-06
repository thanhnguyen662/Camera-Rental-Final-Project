import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import cartApi from '../../../../api/cartApi';
import productApi from '../../../../api/productApi';
import userApi from '../../../../api/userApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import openNotificationWithIcon from '../../../../components/Notification';
import ProductCard from '../../components/ProductCard';
import ProductDetailComment from '../../components/ProductDetailComment';
import ProductDetailDescription from '../../components/ProductDetailDescription';
import ProductDetailImage from '../../components/ProductDetailImage';
import ProductDetailUser from '../../components/ProductDetailUser';
import { addProductToCart } from '../../productSlice';

function ProductDetailPage(props) {
   const { slug } = useParams();
   const history = useHistory();
   const dispatch = useDispatch();

   const userId = useSelector((state) => state.users.id);
   const isUserLogging = localStorage.getItem('providerData') ? true : false;

   const [productDetail, setProductDetail] = useState();
   const [orderInToday, setOrderInToday] = useState([]);
   const [myStats, setMyStats] = useState({});
   const [otherProducts, setOtherProducts] = useState([]);

   useEffect(() => {
      const getProductDetail = async () => {
         try {
            const response = await productApi.getProductDetail(slug);
            setProductDetail(response);

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

   useEffect(() => {
      if (!productDetail) return;
      const getOtherProductInShop = async () => {
         const response = await productApi.otherProductInShop({
            take: 5,
            userId: productDetail.User.firebaseId,
         });
         setOtherProducts(response);
      };
      getOtherProductInShop();
   }, [productDetail]);

   const handleOnClickToAddProduct = async (product) => {
      try {
         if (isUserLogging === false) return history.push('/account/login');
         const data = {
            firebaseId: userId,
            productId: product.id,
            startDate: product.startDate,
            endDate: product.endDate,
         };

         const response = await cartApi.addMoreProductToCart(data);
         // console.log('Add product to cart: ', response);

         if (response.message === 'Product already in cart')
            return openNotificationWithIcon('error', response.message);

         const action = addProductToCart(response);
         dispatch(action);
         openNotificationWithIcon(
            'success',
            'Add product to cart successfully'
         );
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
         <div>
            <Row span={24} gutter={[40, 0]}>
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
         </div>
         <div>
            <Row span={24} gutter={[40, 0]}>
               <Col span={11} className='rowImage'>
                  <ProductDetailUser
                     productDetail={productDetail}
                     myStats={myStats}
                  />
               </Col>
               <Col flex='auto' className='comment'>
                  <ProductDetailComment productDetail={productDetail} />
               </Col>
            </Row>
         </div>
         <div>
            <h1>Other product in shop</h1>
            <ProductCard products={otherProducts} />
         </div>
      </div>
   );
}

export default ProductDetailPage;
