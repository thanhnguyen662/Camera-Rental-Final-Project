import axiosClient from './axiosClient';

const cartApi = {
   getCartByUid: (params) => {
      const url = '/cart/getCart';
      return axiosClient.get(url, { params });
   },

   addMoreProductToCart: (data) => {
      const url = '/cart/addProductToCart';
      return axiosClient.post(url, data);
   },

   removeProductFromCart: (data) => {
      const url = '/cart/removeItemFromCart';
      return axiosClient.delete(url, { data });
   },
};

export default cartApi;
