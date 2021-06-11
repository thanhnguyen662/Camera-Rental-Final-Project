import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
   baseURL: 'http://localhost:4000/',
   headers: {
      'content-type': 'application/json',
   },
   paramsSerializer: (params) => queryString.stringify(params),
});

axios.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token');
      if (token) {
         config.headers['Authorization'] = 'Bearer ' + token;
      }

      return config;
   },
   (error) => {
      Promise.reject(error);
   }
);

axiosClient.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }

      return response;
   },
   (error) => {
      return new Promise((resolve) => {
         const originalRequest = error.config;
         if (error.response && error.response.status === 401) {
            const response = axios
               .post('http://localhost:4000/account/refreshToken', null, {
                  withCredentials: true,
               })
               .then((res) => {
                  localStorage.setItem('token', res.data.token);

                  return axios(originalRequest);
               });
            resolve(response);
         }
      });
   }
);

export default axiosClient;
