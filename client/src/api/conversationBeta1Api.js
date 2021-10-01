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

   sendMessage: (data) => {
      const url = '/conversationBeta1/message/create';
      return axiosClient.post(url, data);
   },

   createConversation: (data) => {
      const url = '/conversationBeta1/conversation/create';
      return axiosClient.post(url, data);
   },
};

export default conversationBeta1Api;
