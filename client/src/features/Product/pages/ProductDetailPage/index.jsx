import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import ProductDetail from '../../components/ProductDetail';

function ProductDetailPage(props) {
   const { slug } = useParams();
   console.log({ slug });

   const [productDetail, setProductDetail] = useState();

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

   return (
      <>
         <ProductDetail productDetail={productDetail} />
      </>
   );
}

export default ProductDetailPage;
