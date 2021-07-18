import axiosClient from './axiosClient';

const productApi = {
   getAllProducts: (params) => {
      const url = '/product';
      return axiosClient.get(url, params);
   },

   getProductDetail: (params) => {
      const url = `/product/${params}`;
      return axiosClient.get(url, {
         withCredentials: true,
      });
   },

   createProduct: (data) => {
      const url = '/product/createProduct';
      return axiosClient.post(url, data);
   },
};

export default productApi;
