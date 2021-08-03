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
};

export default orderApi;
