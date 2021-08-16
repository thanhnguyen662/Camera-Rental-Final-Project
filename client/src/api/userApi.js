import axiosClient from './axiosClient';

const userApi = {
   getMe: (params) => {
      const url = '/account/getUserByUid';
      return axiosClient.get(url, { params });
   },

   getFriendsId: (params) => {
      const url = '/account/getUserByUid';
      return axiosClient.get(url, { params });
   },

   addUserInfo: (data) => {
      const url = '/account/addUserInfo';
      return axiosClient.post(url, data);
   },

   getUserProfile: (params) => {
      const url = '/account/getUserProfileByUid';
      return axiosClient.get(url, { params });
   },

   getUserStats: (params) => {
      const url = '/account/getUserStats';
      return axiosClient.get(url, { params });
   },

   getUserComments: (params) => {
      const url = '/account/comment';
      return axiosClient.get(url, { params });
   },

   createUserComment: (data) => {
      const url = 'account/comment/create';
      return axiosClient.post(url, data);
   },
};

export default userApi;
