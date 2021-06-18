import {
   ChatContainer,
   MainContainer,
   MessageList,
   MessageInput,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import conversationApi from '../../../../api/conversationApi';
import MessageChat from '../../components/MessageChat';
import SideBar from '../../components/MessageSideBar';
import { io } from 'socket.io-client';

function MessagePage(props) {
   const userId = useSelector((state) => state.users.id);
   const [conversation, setConversation] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const socket = useRef();

   useEffect(() => {
      socket.current = io('ws://localhost:8900');
   }, []);

   useEffect(() => {
      if (!userId) return;
      socket.current.emit('addUser', userId);
      socket.current.on('getUsers', (users) => {
         console.log('User is online: ', users);
      });
   }, [userId]);

   const onClickUser = (conversation) => {
      setCurrentChat(conversation);
   };

   console.log(socket);

   useEffect(() => {
      const getConversation = async () => {
         try {
            const getUserId = await userId;
            if (getUserId === undefined) return;

            const response = await conversationApi.getConversation(getUserId);

            console.log('Conversation: ', response.data);
            setConversation(response.data);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getConversation();
   }, [userId]);

   useEffect(() => {
      const getMessage = async () => {
         const currentId = await currentChat?.id;
         if (currentId === undefined) return;

         try {
            const res = await axios.get(
               'http://localhost:4000/message/' + currentId
            );

            setMessages(res.data);
            console.log(messages);
         } catch (err) {
            console.log(err);
         }
      };
      getMessage();
      // eslint-disable-next-line
      console.log('currentChat', currentChat);
   }, [currentChat]);

   const handleInputChange = (val) => {
      setNewMessage(val);
   };

   const handleMessageInputSubmit = async () => {
      if (!userId) return;
      const message = {
         sender: userId,
         text: newMessage,
         conversationId: currentChat?.id,
      };
      console.log('typing: ', message);

      try {
         const response = await axios.post(
            'http://localhost:4000/message',
            message
         );
         setMessages([...messages, response.data]);
      } catch (error) {
         console.log('error: ', error);
      }
   };

   return (
      <>
         <div style={{ height: '600px', position: 'relative' }}>
            <MainContainer>
               <SideBar
                  conversations={conversation}
                  onClickUser={onClickUser}
               />
               <ChatContainer>
                  <MessageList>
                     {messages.map((m) => (
                        <MessageChat
                           key={m.id}
                           message={m}
                           own={parseInt(m.sender) === parseInt(userId)}
                        />
                     ))}
                  </MessageList>
                  <MessageInput
                     placeholder='Type message here'
                     value={newMessage}
                     onChange={handleInputChange}
                     onSend={handleMessageInputSubmit}
                  />
               </ChatContainer>
            </MainContainer>
         </div>
      </>
   );
}

export default MessagePage;
