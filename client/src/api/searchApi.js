import axiosClient from './axiosClient';

const searchApi = {
   gearSuggestion: (params) => {
      const url = '/search/gear/suggestion';
      return axiosClient.get(url, { params });
   },

   result: (params) => {
      const url = '/search/result';
      return axiosClient.get(url, { params });
   },

   userSuggestion: (params) => {
      const url = '/search/user/suggestion';
      return axiosClient.get(url, { params });
   },
};

export default searchApi;
