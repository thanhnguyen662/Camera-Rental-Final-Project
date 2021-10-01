import {
   ConversationList,
   MainContainer,
   MessageList,
   Search,
   Sidebar,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router';
import { io } from 'socket.io-client';
import conversationBeta1Api from '../../../../api/conversationBeta1Api';
import ChatContent from '../../components/ChatContent';
import ConversationDetail from '../../components/ConversationDetail';
import shortid from 'shortid';
import './MessageBeta1Page.scss';
import { newMessage } from '../../messageBeta1Slice';

MessageBeta1page.propTypes = {};

function MessageBeta1page(props) {
   const socket = useRef();
   const match = useRouteMatch();
   const dispatch = useDispatch();

   const userId = useSelector((state) => state.users.id);
   const username = useSelector((state) => state.users.username);
   const photoURL = useSelector((state) => state.users.photoURL);
   const socketMessage = useSelector((state) => state.socketMessage);

   const [conversations, setConversations] = useState([]);

   useEffect(() => {
      const getConversations = async () => {
         const isConversationExist = conversations.some(
            (c) => c.id === Number(socketMessage.conversationId)
         );
         if (!userId || isConversationExist) return;
         try {
            const response = await conversationBeta1Api.getConversation({
               userId: userId,
            });
            console.log('conversation list', response);
            setConversations(response);
         } catch (error) {
            console.log(error);
         }
      };
      getConversations();
      // eslint-disable-next-line
   }, [userId, socketMessage]);

   useEffect(() => {
      if (!userId) return;
      socket.current = io('ws://localhost:9900');
      socket.current.on('messageToReceiver', (message) => {
         console.log('message from socket', message);
         const action = newMessage({
            ...message,
            id: shortid.generate(),
         });
         dispatch(action);
      });
   }, [userId, dispatch]);

   useEffect(() => {
      if (!Object.keys(socketMessage).length) return;
      handleUpdateLatestMessage(socketMessage, socketMessage.conversationId);
      // eslint-disable-next-line
   }, [socketMessage]);

   useEffect(() => {
      if (!userId) return;
      socket.current.emit('myDetail', userId);
   }, [userId]);

   const handleUpdateLatestMessage = (message, conversationId) => {
      setConversations((prev) => {
         const find = prev.findIndex((c) => c.id === Number(conversationId));
         if (find === -1) return;
         prev[find].messages.length = 0;
         prev[find].messages.push(message);

         prev.sort((a, b) => {
            const dateA = a.messages.length
               ? new Date(a.messages[0].createdAt)
               : new Date(a.createdAt);
            const dateB = b.messages.length
               ? new Date(b.messages[0].createdAt)
               : new Date(b.createdAt);
            return dateB - dateA;
         });
         return [...prev];
      });
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
               {socket.current && (
                  <Route
                     path={`${match.url}/:conversationId`}
                     render={() => (
                        <ChatContent
                           userId={userId}
                           username={username}
                           photoURL={photoURL}
                           socket={socket}
                           socketMessage={socketMessage}
                           handleUpdateLatestMessage={handleUpdateLatestMessage}
                        />
                     )}
                  />
               )}
            </MainContainer>
         </div>
      </>
   );
}

export default MessageBeta1page;
