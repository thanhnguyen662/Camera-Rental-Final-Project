import {
   Avatar,
   ChatContainer,
   ConversationHeader,
   ConversationList,
   MainContainer,
   MessageInput,
   MessageList,
   Sidebar,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';
import { io } from 'socket.io-client';
import conversationApi from '../../../../api/conversationApi';
import userApi from '../../../../api/userApi';
import Conversations from '../../components/Conversations';
import Messages from '../../components/Messages';
import './MessageBetaPage.scss';

function MessageBetaPage(props) {
   const currentUserId = useSelector((state) => state.users.id);
   const socket = useRef();

   const [friendInfo, setFriendInfo] = useState([]);
   const [selectedConversation, setSelectedConversation] = useState('');
   const [conversations, setConversations] = useState([]);
   const [messages, setMessages] = useState([]);
   const [incomingMessages, setIncomingMessages] = useState({});

   const [messageInputValue, setMessageInputValue] = useState('');

   useEffect(() => {
      if (!currentUserId) return;

      //connect to Socket Server
      socket.current = io('ws://localhost:9900');
      console.log('socket: ', socket);

      //get message from Socket Server
      socket.current.on('messageToReceiver', (message) => {
         setIncomingMessages({
            id: shortid.generate(),
            sender: message.sender,
            text: message.text,
         });
         console.log('incoming message: ', message);
      });
   }, [currentUserId]);

   useEffect(() => {
      if (!incomingMessages) return;
      setMessages((prevMessages) => [...prevMessages, incomingMessages]);
   }, [incomingMessages]);

   useEffect(() => {
      if (!currentUserId) return;

      //send my userId to Socket Server
      socket.current.emit('myDetail', currentUserId);
   }, [currentUserId]);

   useEffect(() => {
      if (!currentUserId) return;
      try {
         const getConversation = async () => {
            const response = await conversationApi.getConversationBeta(
               currentUserId
            );
            console.log('Conversations: ', response);
            setConversations(response);
         };
         getConversation();
      } catch (error) {
         return console.log(error);
      }
   }, [currentUserId]);

   useEffect(() => {
      if (!selectedConversation) return;
      const getMessagesByConversationId = async () => {
         try {
            const response = await conversationApi.getMessageBeta(
               selectedConversation.id
            );
            console.log('Messages: ', response);
            setMessages(response);
         } catch (error) {
            console.log(error);
         }
      };
      getMessagesByConversationId();
   }, [selectedConversation]);

   const handleOnClickConversation = async (conversation) => {
      console.log('Selected Conversation: ', conversation);
      setSelectedConversation(conversation);

      const friend = conversation.members?.find(
         (member) => member !== currentUserId
      );

      try {
         const response = await userApi.getUserProfile({
            firebaseId: friend,
         });
         console.log('Friend Info: ', response);
         setFriendInfo(response);
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnSendMessage = async () => {
      try {
         const messageDataDb = {
            text: messageInputValue,
            conversationId: selectedConversation.id,
            sender: currentUserId,
         };

         const messageDataSocket = {
            text: messageInputValue,
            sender: currentUserId,
            receiver: friendInfo.firebaseId,
         };

         socket.current.emit('message', messageDataSocket);

         const response = await conversationApi.sendMessage(messageDataDb);
         setMessages([...messages, response]);
      } catch (error) {
         console.log(error);
      }

      setMessageInputValue('');
   };

   return (
      <div className='message'>
         <MainContainer>
            <Sidebar position='left' scrollable={false}>
               <ConversationList position='left' scrollable={false}>
                  {conversations.map((conversation) => (
                     <Conversations
                        key={conversation.id}
                        conversation={conversation}
                        currentUserId={currentUserId}
                        handleOnClickConversation={handleOnClickConversation}
                        selectedConversationId={selectedConversation?.id}
                     />
                  ))}
               </ConversationList>
            </Sidebar>

            {!selectedConversation ? (
               <MessageList>
                  <MessageList.Content className='emptySelectedConversation'>
                     Choose conversation to start chat
                  </MessageList.Content>
               </MessageList>
            ) : (
               <>
                  <ChatContainer>
                     <ConversationHeader>
                        <Avatar
                           src={friendInfo?.photoURL}
                           name={friendInfo?.username}
                        />
                        <ConversationHeader.Content
                           userName={friendInfo?.username}
                        />
                     </ConversationHeader>
                     <MessageList>
                        {messages?.map((message) => (
                           <Messages
                              key={message.id}
                              message={message}
                              friendInfo={friendInfo}
                              currentUserId={currentUserId}
                           />
                        ))}
                     </MessageList>
                     <MessageInput
                        placeholder='Type message here'
                        value={messageInputValue}
                        onChange={(val) => setMessageInputValue(val)}
                        onSend={handleOnSendMessage}
                     />
                  </ChatContainer>
               </>
            )}
         </MainContainer>
      </div>
   );
}

export default MessageBetaPage;
