import {
   Avatar,
   ChatContainer,
   ConversationHeader,
   ConversationList,
   MainContainer,
   MessageInput,
   MessageList,
   Sidebar,
   ExpansionPanel,
   InfoButton,
   Search,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import shortid from 'shortid';
import { io } from 'socket.io-client';
import conversationApi from '../../../../api/conversationApi';
import userApi from '../../../../api/userApi';
import Conversations from '../../components/Conversations';
import Messages from '../../components/Messages';
import { newMessage } from '../../messageSlice';
import './MessageBetaPage.scss';

function MessageBetaPage(props) {
   const socket = useRef();
   const dispatch = useDispatch();
   const location = useLocation();

   const currentUserId = useSelector((state) => state.users.id);
   const reduxIncomingMessage = useSelector((state) => state.messages[0]);

   const [messageInputValue, setMessageInputValue] = useState('');
   const [friendInfo, setFriendInfo] = useState([]);
   const [conversations, setConversations] = useState([]);
   const [messages, setMessages] = useState([]);
   const [selectedConversation, setSelectedConversation] = useState(
      location.state?.conversationInfo || ''
   );

   useEffect(() => {
      if (!currentUserId) return;

      //connect to Socket Server
      socket.current = io('ws://localhost:9900');

      //get message from Socket Server
      socket.current.on('messageToReceiver', (message) => {
         const action = newMessage({
            id: shortid.generate(),
            sender: message.sender,
            text: message.text,
         });
         dispatch(action);
      });
      // eslint-disable-next-line
   }, [currentUserId]);

   useEffect(() => {
      if (
         !reduxIncomingMessage ||
         !selectedConversation.members?.includes(reduxIncomingMessage.sender)
      )
         return;
      setMessages((prevMessages) => [...prevMessages, reduxIncomingMessage]);

      console.log('reduxIncomingMessage: ', reduxIncomingMessage);
   }, [reduxIncomingMessage, selectedConversation.members]);

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
            receiver:
               friendInfo.firebaseId ||
               location.state?.conversationUserInfo.firebaseId,
         };

         socket.current.emit('message', messageDataSocket);

         const response = await conversationApi.sendMessage(messageDataDb);
         setMessages([...messages, response]);
      } catch (error) {
         console.log(error);
      }

      setMessageInputValue('');
   };

   const loading = conversations?.length === 0 && {
      loading: true,
   };

   return (
      <div className='message'>
         <MainContainer>
            <Sidebar position='left' scrollable={false}>
               <Search placeholder='Search...' />
               <ConversationList
                  position='left'
                  scrollable={false}
                  {...loading}
               >
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
                        <ConversationHeader.Back
                           onClick={() => setSelectedConversation('')}
                        />
                        <Avatar
                           src={
                              friendInfo?.photoURL ||
                              location.state?.conversationUserInfo.photoURL
                           }
                           name={
                              friendInfo?.username ||
                              location.state?.conversationUserInfo.username
                           }
                        />
                        <ConversationHeader.Content
                           userName={
                              friendInfo?.username ||
                              location.state?.conversationUserInfo.username
                           }
                        />
                        <ConversationHeader.Actions>
                           <Link to={`/profile/${friendInfo?.firebaseId}`}>
                              <InfoButton />
                           </Link>
                        </ConversationHeader.Actions>
                     </ConversationHeader>
                     <MessageList>
                        {messages?.map((message) => (
                           <Messages
                              key={message.id}
                              message={message}
                              friendInfo={friendInfo}
                              currentUserId={currentUserId}
                              redirectData={
                                 location.state?.conversationUserInfo
                              }
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
                  <Sidebar position='right'>
                     <ExpansionPanel open title='Information'>
                        <p>Lorem ipsum</p>
                     </ExpansionPanel>
                     <ExpansionPanel title='Media'>
                        <p>Lorem ipsum</p>
                     </ExpansionPanel>
                  </Sidebar>
               </>
            )}
         </MainContainer>
      </div>
   );
}

export default MessageBetaPage;
