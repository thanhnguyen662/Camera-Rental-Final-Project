import axiosClient from './axiosClient';

const pinApi = {
   getAllPins: () => {
      const url = '/pin/getAllPins';
      return axiosClient.get(url);
   },

   getPin: (params) => {
      const url = '/pin/getPin';
      return axiosClient.get(url, { params });
   },

   getSearch: (params) => {
      const url = '/pin/getSearch';
      return axiosClient.get(url, { params });
   },
};

export default pinApi;
