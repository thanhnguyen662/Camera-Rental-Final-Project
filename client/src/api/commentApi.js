import axiosClient from './axiosClient';

const commentApi = {
   createComment: (data) => {
      const url = '/comment/create';
      return axiosClient.post(url, data);
   },
};

export default commentApi;
