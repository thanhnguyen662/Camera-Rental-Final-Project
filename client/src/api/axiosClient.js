import axios from 'axios';
import queryString from 'query-string';
import { auth } from '../firebase';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs
const getFirebaseToken = async () => {
   const currentUser = auth.currentUser;
   if (currentUser) return currentUser.getIdToken();

   // Not logged in
   const hasRememberedAccount = localStorage.getItem('providerData');
   if (!hasRememberedAccount) return null;

   // Logged in but current user is not fetched --> wait (10s)
   return new Promise((resolve, reject) => {
      const waitTimer = setTimeout(() => {
         reject(null);
      }, 10000);

      const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
         if (!user) {
            reject(null);
         }

         const token = await user.getIdToken();
         resolve(token);

         unregisterAuthObserver();
         clearTimeout(waitTimer);
      });
   });
};

const axiosClient = axios.create({
   baseURL: 'http://localhost:4000/',
   headers: {
      'content-type': 'application/json',
   },
   paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
   const token = await getFirebaseToken();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

axiosClient.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }

      return response;
   }
   // (error) => {
   //    return new Promise((resolve) => {
   //       const originalRequest = error.config;
   //       if (error.response && error.response.status === 401) {
   //          const response = axios
   //             .post('http://localhost:4000/account/refreshToken', null, {
   //                withCredentials: true,
   //             })
   //             .then((res) => {
   //                localStorage.setItem('token', res.data.token);

   //                return axios(originalRequest);
   //             });
   //          resolve(response);
   //       }
   //    });
   // }
);

export default axiosClient;
