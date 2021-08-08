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
};

export default orderApi;
