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
            startDate: moment(newItem.startDate).format('YYYY-MM-DD HH:mm'),
            endDate: moment(newItem.endDate).format('YYYY-MM-DD HH:mm'),
         };

         state.push(convertUTC7);
      },
      removeProductFromCart: (state, action) => {
         const removeItem = action.payload;
         return state.filter((i) => i.id !== removeItem.id);
      },
      editProductTimeInCart: (state, action) => {
         const updateItem = action.payload;
         state.map((i) => {
            if (
               i.productId === updateItem.productId &&
               i.firebaseId === updateItem.firebaseId
            ) {
               i.startDate = moment(new Date(updateItem.startDate)).format(
                  'YYYY-MM-DD HH:mm'
               );
               i.endDate = moment(new Date(updateItem.endDate)).format(
                  'YYYY-MM-DD HH:mm'
               );
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
               startDate: moment(i.startDate).format('YYYY-MM-DD HH:mm'),
               endDate: moment(i.endDate).format('YYYY-MM-DD HH:mm'),
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
