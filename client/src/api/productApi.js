import axiosClient from './axiosClient';

const productApi = {
   getAllProducts: (params) => {
      const url = '/product';
      return axiosClient.get(url, params);
   },
};

export default productApi;
