import axiosClient from './axiosClient';

const categoryApi = {
   getCategory: () => {
      const url = '/category';
      return axiosClient.get(url);
   },
};

export default categoryApi;
