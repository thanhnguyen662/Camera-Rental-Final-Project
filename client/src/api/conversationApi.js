import axiosClient from './axiosClient';

const conversationApi = {
   getConversation: (userId) => {
      const url = `/conversation/${userId}`;
      return axiosClient.get(url, {
         withCredentials: true,
      });
   },

   getMessage: async (chatId) => {
      const url = `/message/${chatId}`;
      return await axiosClient.get(url, {
         withCredentials: true,
      });
   },
};

export default conversationApi;
