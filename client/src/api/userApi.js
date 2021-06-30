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
};

export default userApi;
