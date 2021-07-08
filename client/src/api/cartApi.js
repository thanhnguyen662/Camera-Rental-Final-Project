import axiosClient from './axiosClient';

const cartApi = {
   getCartByUid: (params) => {
      const url = '/cart/getCart';
      return axiosClient.get(url, { params });
   },
};

export default cartApi;
