import axiosClient from './axiosClient';

const conversationApi = {
   getConversation: (userId) => {
      const url = `/conversation/${userId}`;
      return axiosClient.get(url);
   },

   getMessage: (chatId) => {
      const url = `/message/${chatId}`;
      return axiosClient.get(url, {
         withCredentials: true,
      });
   },

   sendMessage: (message) => {
      const url = `/message`;
      return axiosClient.post(url, message);
   },

   createConversation: (conversation) => {
      const url = '/conversation';
      return axiosClient.post(url, conversation);
   },

   getConversationBeta: (userId) => {
      const url = `/conversation/beta/${userId}`;
      return axiosClient.get(url);
   },

   getMessageBeta: (conversationId, page) => {
      const url = `/message/beta/${conversationId}/${page}`;
      return axiosClient.get(url);
   },
};

export default conversationApi;
