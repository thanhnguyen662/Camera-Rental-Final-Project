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

   updateAddCountInPost: (data) => {
      const url = '/post/update/add';
      return axiosClient.patch(url, data);
   },

   createCommentInPost: (data) => {
      const url = '/post/create/comment';
      return axiosClient.post(url, data);
   },

   getUserSocialStats: (params) => {
      const url = '/post/stats/user';
      return axiosClient.get(url, { params });
   },

   getPostDetail: (params) => {
      const url = '/post/detail';
      return axiosClient.get(url, { params });
   },

   getPostComment: (params) => {
      const url = '/post/comments';
      return axiosClient.get(url, { params });
   },
};

export default postApi;
