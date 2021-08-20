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

   getMyProduct: (params) => {
      const url = '/product/myProduct';
      return axiosClient.get(url, { params });
   },

   orderItemsIncludeProduct: (params) => {
      const url = '/product/orderItemsIncludeProduct';
      return axiosClient.get(url, { params });
   },

   searchSuggestion: (params) => {
      const url = '/product/searchSuggestion';
      return axiosClient.get(url, { params });
   },
};

export default productApi;
