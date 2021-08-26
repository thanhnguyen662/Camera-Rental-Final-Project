import axiosClient from './axiosClient';

const orderApi = {
   createOrder: (data) => {
      const url = '/order/createOrder';
      return axiosClient.post(url, data);
   },

   manageOrder: (params) => {
      const url = '/order/manageOrder';
      return axiosClient.get(url, { params });
   },

   myProductInOrder: (params) => {
      const url = '/order/myProductInOrder';
      return axiosClient.get(url, { params });
   },

   deleteOrder: (data) => {
      const url = '/order/deleteOrder';
      return axiosClient.delete(url, { data });
   },

   updateOrder: (data) => {
      const url = '/order/updateOrder';
      return axiosClient.patch(url, data);
   },

   updateOrderToPaid: (data) => {
      const url = '/order/updateOrderToPaid';
      return axiosClient.patch(url, data);
   },

   updateOrderToBack: (data) => {
      const url = '/order/updateOrderToBack';
      return axiosClient.patch(url, data);
   },

   updateUserStat: (params) => {
      const url = '/order/updateStats';
      return axiosClient.get(url, { params });
   },

   countMyProductOrder: (params) => {
      const url = '/order/countMyProductOrder';
      return axiosClient.get(url, { params });
   },

   myProductInOrderOverview: (params) => {
      const url = '/order/myProductInOrderOverview';
      return axiosClient.get(url, { params });
   },
};

export default orderApi;
