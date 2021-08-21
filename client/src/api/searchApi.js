import axiosClient from './axiosClient';

const searchApi = {
   suggestion: (params) => {
      const url = '/search/suggestion';
      return axiosClient.get(url, { params });
   },

   result: (params) => {
      const url = '/search/result';
      return axiosClient.get(url, { params });
   },
};

export default searchApi;
