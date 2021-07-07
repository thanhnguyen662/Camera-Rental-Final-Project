import { createSlice } from '@reduxjs/toolkit';

const cartProduct = createSlice({
   name: 'cart',
   initialState: [],
   reducers: {
      addProductToCart: (state, action) => {
         const item = state.find((i) => i.id === action.payload.id);
         if (item) {
            return;
         }
         const newItem = action.payload;
         state.push(newItem);
      },
      removeProductFromCart: (state, action) => {
         const removeItem = action.payload;
         return state.filter((i) => i.id !== removeItem.id);
      },
   },
});

const { reducer, actions } = cartProduct;
export const { addProductToCart, removeProductFromCart } = actions;
export default reducer;
