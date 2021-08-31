import axiosClient from './axiosClient';

const postApi = {
   createPost: (params) => {
      const url = '/post/create';
      return axiosClient.post(url, params);
   },

   getPost: (params) => {
      const url = '/post';
      return axiosClient.get(url, { params });
   },

   likePost: (data) => {
      const url = '/post/like';
      return axiosClient.patch(url, data);
   },

   unlikePost: (data) => {
      const url = '/post/unlike';
      return axiosClient.patch(url, data);
   },
};

export default postApi;
