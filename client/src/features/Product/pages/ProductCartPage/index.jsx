import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../../../api/cartApi';
import ContentLayout from '../../../../layouts/Content';
import ProductCartTable from '../../components/ProductCartTable';
import { removeProductFromCart } from '../../productSlice';

function ProductCardPage(props) {
   const dispatch = useDispatch();
   const userId = useSelector((state) => state.users.id);

   const handleOnClickRemoveItem = async (product) => {
      const action = removeProductFromCart(product);
      dispatch(action);

      try {
         const data = {
            firebaseId: userId,
            productId: parseInt(product.id),
         };
         const response = await cartApi.removeProductFromCart(data);

         console.log('Item removed successfully: ', response);
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   return (
      <>
         <div style={{ margin: '25px 144px' }}>
            <ContentLayout>
               <ProductCartTable onClickRemoveItem={handleOnClickRemoveItem} />
            </ContentLayout>
         </div>
      </>
   );
}

export default ProductCardPage;
