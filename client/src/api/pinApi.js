import axiosClient from './axiosClient';

const pinApi = {
   getAllPins: () => {
      const url = '/pin/getAllPins';
      return axiosClient.get(url);
   },
};

export default pinApi;
