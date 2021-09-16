import { Col, Modal, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cartApi from '../../../../api/cartApi';
import orderApi from '../../../../api/orderApi';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
// import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import ResponseResult from '../../../../components/ResponseResult';
import ProductCartAddress from '../../components/ProductCartAddress';
import ProductCartNotionalPrice from '../../components/ProductCartNotionalPrice';
import ProductCartTable from '../../components/ProductCartTable';
import {
   editProductTimeInCart,
   removeProductFromCart,
} from '../../productSlice';

function ProductCardPage(props) {
   const dispatch = useDispatch();

   const userId = useSelector((state) => state.users.id);
   const userAddress = useSelector((state) => state.users.address);
   const userPhotoURL = useSelector((state) => state.users.photoURL);
   const name = useSelector((state) => state.users.name);
   const productInCart = useSelector((state) => state.cart);
   const email = useSelector((state) => state.users.email);
   const phoneNumber = useSelector((state) => state.users.phoneNumber);

   const [selectRows, setSelectRows] = useState([]);
   const [responseResult, setResponseResult] = useState();

   const sumArray = (array) => {
      if (array.length === 0) return;
      const reducer = (accumulator, curr) => accumulator + curr;
      const totalPrice = array.reduce(reducer);

      return totalPrice;
   };

   const error = () => {
      Modal.error({
         title: 'Can not create Order',
         content: (
            <div>
               <p>
                  Make sure the products in order are rented at the same time
               </p>
               <b>
                  If you want to rent in 2 stores with different time, please
                  order 2 times
               </b>
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
      console.log('selectedRows', selectedRows);
      setSelectRows(selectedRows);
   };

   const handleClickOrderButton = async () => {
      let uniqueUsername = [];
      let groupProductByUsername = [];
      let sumPriceArray = [];

      selectRows.map((row) => {
         return uniqueUsername.push(row.Product.User.username);
      });
      uniqueUsername = [...new Set(uniqueUsername)];
      /////////////
      let stop = false;
      // eslint-disable-next-line
      uniqueUsername.map((u) => {
         const filterByUsername = selectRows.filter(
            (f) => f.Product.User.username === u
         );
         if (filterByUsername.length >= 2) {
            // eslint-disable-next-line
            filterByUsername.map((t) => {
               const startDate = new Date(filterByUsername[0].startDate);
               const endDate = new Date(filterByUsername[0].endDate);
               // eslint-disable-next-line
               if (filterByUsername.indexOf(t) === 0) return;
               if (
                  new Date(t.startDate).getTime() !== startDate.getTime() ||
                  new Date(t.endDate).getTime() !== endDate.getTime()
               ) {
                  console.log('not equal');
                  return (stop = true);
               } else {
                  console.log('equal');
               }
            });
         }
      });
      if (stop === true) {
         return error();
      }
      /////////////
      uniqueUsername.map(async (unique) => {
         let filter = selectRows.filter(
            (s) => s.Product.User.username === unique
         );
         if (filter.length === 0) filter = [...selectRows];
         filter.map((row) => {
            const startDate = moment(row.startDate);
            const endDate = moment(row.endDate);
            const duringHoursPerRow = endDate.diff(startDate, 'hours');
            const pricePerRow =
               parseInt(row.Product.price) * parseInt(duringHoursPerRow);
            sumPriceArray.push(pricePerRow);

            return groupProductByUsername.push({
               productId: row.Product.id,
               startDate: new Date(row.startDate),
               endDate: new Date(row.endDate),
               price: parseInt(row.Product.price),
               totalPricePerHour: String(pricePerRow),
               during: String(duringHoursPerRow),
            });
         });

         const response = await orderApi
            .createOrder({
               orderStatusId: 1,
               address: userAddress,
               totalPrice: sumArray(sumPriceArray),
               userId: userId,
               orderItem: groupProductByUsername,
            })
            .then((groupProductByUsername = []))
            .then((sumPriceArray = []));
         console.log(response);
         return setResponseResult(response);
      });
   };

   return (
      <>
         {responseResult && (
            <Redirect
               to={{
                  pathname: '/responseResult',
                  state: { responseResult: responseResult },
               }}
            >
               <ResponseResult response={responseResult} />
            </Redirect>
         )}
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
