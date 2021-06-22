import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail';

function ProductDetailPage(props) {
   const { slug } = useParams();
   console.log({ slug });

   const [productDetail, setProductDetail] = useState();

   useEffect(() => {
      const getProductDetail = async () => {
         try {
            const response = await axios(
               `http://localhost:4000/product/${slug}`
            );
            setProductDetail(response.data);

            console.log(response.data);
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
