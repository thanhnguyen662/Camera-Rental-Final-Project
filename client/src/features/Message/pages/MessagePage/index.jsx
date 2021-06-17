import React, { useEffect, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer } from '@chatscope/chat-ui-kit-react';
import SideBar from '../../components/MessageSideBar';
import Container from '../../components/MessageChatContainer';
import { useSelector } from 'react-redux';
import conversationApi from '../../../../api/conversationApi';

function MessagePage(props) {
   const userId = useSelector((state) => state.users.id);
   const [conversation, setConversation] = useState();

   useEffect(() => {
      const getConversation = async () => {
         try {
            const response = await conversationApi.getConversation(userId);

            console.log('Conversation: ', response.data);
            setConversation(response.data);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getConversation();
   }, [userId]);

   return (
      <>
         <div style={{ height: '600px', position: 'relative' }}>
            <MainContainer>
               <SideBar conversations={conversation} />
               <Container />
            </MainContainer>
         </div>
      </>
   );
}

export default MessagePage;
