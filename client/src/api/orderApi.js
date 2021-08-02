import axiosClient from './axiosClient';

const orderApi = {
   createOrder: (data) => {
      const url = '/order/createOrder';
      return axiosClient.post(url, data);
   },
};

export default orderApi;
