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
         const item = state.find((i) => i.id === action.payload.id);
         if (item) {
            return;
         }
         console.log('payload: ', action.payload);
         const newItem = action.payload;
         state.push(newItem);
      },
      removeProductFromCart: (state, action) => {
         const removeItem = action.payload;
         return state.filter((i) => i.id !== removeItem.id);
      },
   },
   extraReducers: {
      [getCart.fulfilled]: (state, action) => {
         const item = action.payload;

         const destructuringItem = item.map((i) => {
            const split = { ...i };
            split.id = i.Product?.id;
            split.name = i.Product?.name;
            split.description = i.Product?.description;
            split.createdAt = i.Product?.createdAt;
            split.updatedAt = i.Product?.updatedAt;
            split.firebaseId = i.Product?.firebaseId;
            split.key = i.Product?.id;
            split.startDate = moment(i.startDate)
               .utcOffset(7)
               .format('YYYY-MM-DD HH:mm:ss');
            split.endDate = moment(i.endDate)
               .utcOffset(7)
               .format('YYYY-MM-DD HH:mm:ss');

            delete split.Product;

            return split;
         });
         destructuringItem.map((i) => state.push(i));
      },
   },
});

const { reducer, actions } = cartProduct;
export const { addProductToCart, removeProductFromCart } = actions;
export default reducer;
