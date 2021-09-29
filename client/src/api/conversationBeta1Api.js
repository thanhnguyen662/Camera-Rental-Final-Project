import axiosClient from './axiosClient';

const conversationBeta1Api = {
   getConversation: (params) => {
      const url = `/conversationBeta1/conversation`;
      return axiosClient.get(url, { params });
   },

   getMessage: (params) => {
      const url = `/conversationBeta1/message`;
      return axiosClient.get(url, { params });
   },
};

export default conversationBeta1Api;
