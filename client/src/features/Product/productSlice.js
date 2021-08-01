import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';
import moment from 'moment';

export const getCart = createAsyncThunk('product/getCart', async (userId) => {
   const response = await cartApi.getCartByUid(userId);
   return response;
});

const cartProduct = createSlice({
   name: 'cart',
   initialState: [],
   reducers: {
      addProductToCart: (state, action) => {
         const newItem = action.payload;

         const convertUTC7 = {
            ...newItem,
            startDate: moment(newItem.startDate)
               .utcOffset(7)
               .format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(newItem.endDate)
               .utcOffset(7)
               .format('YYYY-MM-DD HH:mm:ss'),
         };

         state.push(convertUTC7);
      },
      removeProductFromCart: (state, action) => {
         const removeItem = action.payload;
         return state.filter((i) => i.id !== removeItem.id);
      },
      editProductTimeInCart: (state, action) => {
         console.log('action', action);
         const updateItem = action.payload;
         state.map((i) => {
            if (
               i.productId === updateItem.productId &&
               i.firebaseId === updateItem.firebaseId
            ) {
               i.startDate = updateItem.startDate;
               i.endDate = updateItem.endDate;
            }

            return state;
         });
      },
   },
   extraReducers: {
      [getCart.fulfilled]: (state, action) => {
         const item = action.payload;
         const convertDateTimeType = item.map((i) => {
            const convertUTC7 = {
               ...i,
               startDate: moment(i.startDate)
                  .utcOffset(7)
                  .format('YYYY-MM-DD HH:mm:ss'),
               endDate: moment(i.endDate)
                  .utcOffset(7)
                  .format('YYYY-MM-DD HH:mm:ss'),
            };

            return convertUTC7;
         });
         convertDateTimeType.map((i) => state.push(i));
      },
   },
});

const { reducer, actions } = cartProduct;
export const {
   addProductToCart,
   removeProductFromCart,
   editProductTimeInCart,
} = actions;
export default reducer;
