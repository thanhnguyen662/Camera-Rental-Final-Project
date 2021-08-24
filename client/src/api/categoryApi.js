import axiosClient from './axiosClient';

const categoryApi = {
   getCategory: () => {
      const url = '/category';
      return axiosClient.get(url);
   },

   getProductInCategory: (params) => {
      const url = '/category/productInCategory';
      return axiosClient.get(url, { params });
   },
};

export default categoryApi;
