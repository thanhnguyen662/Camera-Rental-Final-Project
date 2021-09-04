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

   updateIsComment: (data) => {
      const url = '/order/updateIsComment';
      return axiosClient.patch(url, data);
   },

   ////////////////////
   countMyOrder: (params) => {
      const url = '/order/count';
      return axiosClient.get(url, { params });
   },

   getRevenueInTime: (params) => {
      const url = '/order/revenue/time';
      return axiosClient.get(url, { params });
   },

   getCreateInTime: (params) => {
      const url = '/order/create/time';
      return axiosClient.get(url, { params });
   },

   getOrderByStatus: (params) => {
      const url = '/order/status';
      return axiosClient.get(url, { params });
   },

   updateAccept: (data) => {
      const url = '/order/update/accept';
      return axiosClient.patch(url, data);
   },

   updateFailure: (data) => {
      const url = '/order/update/failure';
      return axiosClient.patch(url, data);
   },

   updateRented: (data) => {
      const url = '/order/update/rented';
      return axiosClient.patch(url, data);
   },

   updateBack: (data) => {
      const url = '/order/update/back';
      return axiosClient.patch(url, data);
   },

   updateUserComeStat: (data) => {
      const url = '/order/update/user/come';
      return axiosClient.patch(url, data);
   },

   updateUserSuccessStat: (data) => {
      const url = '/order/update/user/success';
      return axiosClient.patch(url, data);
   },
   /////////////////////////////////
};

export default orderApi;
