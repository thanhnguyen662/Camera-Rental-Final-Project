import axiosClient from './axiosClient';

const conversationApi = {
   getConversation: (userId) => {
      const url = `/conversation/${userId}`;
      return axiosClient.get(url);
   },

   getMessage: async (chatId) => {
      const url = `/message/${chatId}`;
      return await axiosClient.get(url, {
         withCredentials: true,
      });
   },

   sendMessage: async (message) => {
      const url = `/message`;
      return await axiosClient.post(url, message);
   },
};

export default conversationApi;
