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
};

export default userApi;
