import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../../../api/cartApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ProductCartNotionalPrice from '../../components/ProductCartNotionalPrice';
import ProductCartTable from '../../components/ProductCartTable';
import {
   editProductTimeInCart,
   removeProductFromCart,
} from '../../productSlice';

function ProductCardPage(props) {
   const dispatch = useDispatch();
   const userId = useSelector((state) => state.users.id);
   const productInCart = useSelector((state) => state.cart);

   const [selectRows, setSelectRows] = useState([]);

   const handleOnClickRemoveItem = async (product) => {
      const action = removeProductFromCart(product);
      dispatch(action);

      try {
         const data = {
            firebaseId: userId,
            productId: parseInt(product.Product.id),
         };
         const response = await cartApi.removeProductFromCart(data);

         console.log('Item removed successfully: ', response);
      } catch (error) {
         return console.log('Error: ', error);
      }
   };

   const handleDatePickerChange = async (record, dateStrings) => {
      try {
         const updateData = {
            startDate: dateStrings[0],
            endDate: dateStrings[1],
            productId: record.productId,
            firebaseId: record.firebaseId,
         };
         const response = await cartApi.editProductTimeInCart(updateData);
         console.log('Item updated successfully: ', response);
         const action = editProductTimeInCart(updateData);
         dispatch(action);
      } catch (error) {
         console.log('Error: ', error);
      }
   };

   const handleChangeRowSelection = (selectedRows) => {
      setSelectRows(selectedRows);
   };

   return (
      <>
         <BreadcrumbBar />
         <Row gutter={[15, 10]}>
            <Col span={17}>
               <ProductCartTable
                  onClickRemoveItem={handleOnClickRemoveItem}
                  productInCart={productInCart}
                  handleDatePickerChange={handleDatePickerChange}
                  handleChangeRowSelection={handleChangeRowSelection}
               />
            </Col>
            <Col span={7}>
               <ProductCartNotionalPrice selectRows={selectRows} />
            </Col>
         </Row>
      </>
   );
}

export default ProductCardPage;
