import axiosClient from './axiosClient';

const userApi = {
   register: (registerValues) => {
      const url = '/account/register';
      return axiosClient.post(url, registerValues);
   },

   login: (loginValues) => {
      const url = '/account/login';
      return axiosClient.post(url, loginValues, {
         withCredentials: true,
      });
   },

   refreshToken: (loginValues) => {
      const url = '/account/refreshToken';
      return axiosClient.post(url, loginValues, {
         withCredentials: true,
      });
   },

   profile: () => {
      const url = '/account/profile';
      const token = localStorage.getItem('token');
      return axiosClient.get(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   },

   logout: () => {
      const url = '/account/logout';
      return axiosClient.get(url, {
         withCredentials: true,
      });
   },
};

export default userApi;
