import axiosClient from './axiosClient';

const adminApi = {
   revenueAnalytics: (params) => {
      const url = '/admin/revenue/analytics';
      return axiosClient.get(url, { params });
   },

   orderAnalytics: (params) => {
      const url = '/admin/order/count';
      return axiosClient.get(url, { params });
   },

   adminManageProduct: (params) => {
      const url = '/admin/product/manage';
      return axiosClient.get(url, { params });
   },
};

export default adminApi;
