import { Col, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import cartApi from '../../../../api/cartApi';
import orderApi from '../../../../api/orderApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ProductCartAddress from '../../components/ProductCartAddress';
import ProductCartNotionalPrice from '../../components/ProductCartNotionalPrice';
import ProductCartTable from '../../components/ProductCartTable';
import openNotificationWithIcon from '../../../../components/Notification';
import {
   editProductTimeInCart,
   removeProductFromCart,
} from '../../productSlice';

function ProductCardPage(props) {
   const dispatch = useDispatch();
   const history = useHistory();

   const userId = useSelector((state) => state.users.id);
   const userAddress = useSelector((state) => state.users.address);
   const userPhotoURL = useSelector((state) => state.users.photoURL);
   const name = useSelector((state) => state.users.name);
   const productInCart = useSelector((state) => state.cart);
   const email = useSelector((state) => state.users.email);
   const phoneNumber = useSelector((state) => state.users.phoneNumber);

   const [selectRows, setSelectRows] = useState([]);

   const error = () => {
      Modal.error({
         title: 'Can not create Order',
         content: (
            <div>
               Make sure the products in same shop are rented at the same time
            </div>
         ),
      });
   };

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

   const handleClickOrderButton = async () => {
      try {
         const response = await orderApi.createOrder({
            orderData: selectRows,
            userAddress: userAddress,
            userId: userId,
         });
         if (response.message === 'Date not equal') return error();
         if (response.message === 'Create Order Success') {
            openNotificationWithIcon(
               'success',
               'Created',
               'Order created successfully'
            );
            return history.push('/manages/user/pending');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <BreadcrumbBar />
         <Row gutter={[12, 12]}>
            <Col span={17}>
               <ProductCartTable
                  onClickRemoveItem={handleOnClickRemoveItem}
                  productInCart={productInCart}
                  handleDatePickerChange={handleDatePickerChange}
                  handleChangeRowSelection={handleChangeRowSelection}
               />
            </Col>
            <Col span={7}>
               <ProductCartAddress
                  userId={userId}
                  userAddress={userAddress}
                  userPhotoURL={userPhotoURL}
                  name={name}
                  email={email}
                  phoneNumber={phoneNumber}
               />
               <ProductCartNotionalPrice
                  selectRows={selectRows}
                  handleClickOrderButton={handleClickOrderButton}
               />
            </Col>
         </Row>
      </>
   );
}

export default ProductCardPage;
