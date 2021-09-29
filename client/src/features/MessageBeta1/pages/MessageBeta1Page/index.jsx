import {
   ConversationList,
   MainContainer,
   Search,
   Sidebar,
   MessageList,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router';
import conversationBeta1Api from '../../../../api/conversationBeta1Api';
import ChatContent from '../../components/ChatContent';
import ConversationDetail from '../../components/ConversationDetail';
import './MessageBeta1Page.scss';

MessageBeta1page.propTypes = {};

function MessageBeta1page(props) {
   const userId = useSelector((state) => state.users.id);
   const match = useRouteMatch();

   const [conversations, setConversations] = useState([]);
   const [input, setInput] = useState('');

   useEffect(() => {
      if (!userId) return;
      const getConversations = async () => {
         try {
            const response = await conversationBeta1Api.getConversation({
               userId: userId,
            });
            setConversations(response);
         } catch (error) {
            console.log(error);
         }
      };
      getConversations();
   }, [userId]);

   const handleInput = (text) => {
      setInput(text);
   };

   const handleSend = () => {
      console.log(input);
      setInput('');
   };

   return (
      <>
         <div className='messageBetaPage1'>
            <MainContainer responsive>
               <Sidebar position='left' scrollable={false}>
                  <Search placeholder='Search...' />
                  <ConversationList>
                     <div as='Conversation'>
                        <ConversationDetail
                           conversations={conversations}
                           userId={userId}
                        />
                     </div>
                  </ConversationList>
               </Sidebar>
               <Route
                  exact
                  path={`${match.url}`}
                  render={() => (
                     <MessageList>
                        <MessageList.Content className='empty'>
                           Choose conversation to start chat
                        </MessageList.Content>
                     </MessageList>
                  )}
               />
               <Route
                  path={`${match.url}/:conversationId`}
                  render={() => (
                     <ChatContent
                        userId={userId}
                        as='ChatContainer'
                        input={input}
                        handleInput={handleInput}
                        handleSend={handleSend}
                     />
                  )}
               />
            </MainContainer>
         </div>
      </>
   );
}

export default MessageBeta1page;
