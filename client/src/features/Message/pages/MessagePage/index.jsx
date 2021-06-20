import {
   ChatContainer,
   MainContainer,
   MessageInput,
   MessageList,
   ConversationHeader,
   VoiceCallButton,
   EllipsisButton,
   Avatar,
   VideoCallButton,
   ExpansionPanel,
   Sidebar,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import MessageChat from '../../components/MessageChat';
import SideBarLeft from '../../components/MessageSideBar';
var uniqid = require('uniqid');

function MessagePage(props) {
   const userId = useSelector((state) => state.users.id);
   const socket = useRef();
   const [conversation, setConversation] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [getUsernameById, setGetUsernameById] = useState(null);

   useEffect(() => {
      socket.current = io('ws://localhost:8900');
      socket.current.on('getMessage', (data) => {
         setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createAt: Date.now(),
         });
         console.log('getMessage data: ', data);
      });
   }, []);

   useEffect(() => {
      if (!currentChat?.members) console.log('Wait a minutes');
      if (!arrivalMessage) console.log('Wait a minutes');

      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage, currentChat]);

   useEffect(() => {
      if (!userId) return;
      socket.current.emit('addUser', userId);
      socket.current.on('getUsers', (users) => {
         console.log('User is online: ', users);
      });
   }, [userId]);

   const onClickUser = (conversation) => {
      setCurrentChat(conversation);
      console.log('conversation is', conversation);
   };

   useEffect(() => {
      const getConversation = async () => {
         try {
            if (!userId) return;
            const response = await axios.get(
               `http://localhost:4000/conversation/${userId}`
            );
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
         const currentId = currentChat?.id;
         if (!currentId) return;
         try {
            const response = await axios.get(
               `http://localhost:4000/message/${currentId}`
            );

            setMessages(response.data);
            console.log(messages);
         } catch (err) {
            console.log(err);
         }
      };
      getMessage();
      console.log('currentChat', currentChat);
      // eslint-disable-next-line
   }, [currentChat]);

   const handleMessageInputSubmit = async () => {
      if (!userId) return;
      const message = {
         sender: userId,
         text: newMessage,
         conversationId: currentChat?.id,
      };

      const receiverId = currentChat.members.find(
         (member) => parseInt(member) !== parseInt(userId)
      );
      console.log('receiverId sendMessage: ', parseInt(receiverId));
      console.log('userId sendMessage: ', userId);
      console.log('text sendMessage: ', newMessage);
      socket.current.emit('sendMessage', {
         senderId: parseInt(userId),
         receiverId: parseInt(receiverId),
         text: newMessage,
      });

      try {
         const response = await axios.post(
            'http://localhost:4000/message',
            message
         );
         setMessages([...messages, response.data]);
         setNewMessage('');
      } catch (error) {
         console.log('error: ', error);
      }
   };

   useEffect(() => {
      const receiverIdInGroup = currentChat?.members.filter(
         (user) => parseInt(user) !== parseInt(userId)
      );
      const getUsernameByIdFunction = async () => {
         try {
            if (!receiverIdInGroup) return;
            const response = await axios.get(
               `http://localhost:4000/account?userId=${receiverIdInGroup}`
            );

            setGetUsernameById(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getUsernameByIdFunction();
   }, [userId, currentChat?.members]);

   return (
      <>
         <div style={{ height: '800px', position: 'relative' }}>
            <MainContainer>
               <SideBarLeft
                  conversations={conversation}
                  onClickUser={onClickUser}
               />
               <ChatContainer>
                  {currentChat && (
                     <ConversationHeader>
                        <ConversationHeader.Back
                           onClick={() => setCurrentChat(null)}
                        />
                        <Avatar
                           src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                           name=''
                        />
                        <ConversationHeader.Content
                           userName={getUsernameById?.name}
                        />
                        <ConversationHeader.Actions>
                           <VoiceCallButton />
                           <VideoCallButton />
                           <EllipsisButton orientation='vertical' />
                        </ConversationHeader.Actions>
                     </ConversationHeader>
                  )}
                  {currentChat ? (
                     <MessageList>
                        {messages.map((m) => (
                           <div key={uniqid()}>
                              <MessageChat
                                 message={m}
                                 own={parseInt(m.sender) === parseInt(userId)}
                              />
                           </div>
                        ))}
                     </MessageList>
                  ) : (
                     <MessageList>
                        <MessageList.Content
                           style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              height: '100%',
                              textAlign: 'center',
                              fontSize: '1.2em',
                           }}
                        >
                           Choose conversation to start chat
                        </MessageList.Content>
                     </MessageList>
                  )}
                  ,
                  {currentChat && (
                     <MessageInput
                        placeholder='Type message here'
                        value={newMessage}
                        onChange={(val) => setNewMessage(val)}
                        onSend={handleMessageInputSubmit}
                     />
                  )}
               </ChatContainer>
               {currentChat && (
                  <Sidebar position='right'>
                     <ExpansionPanel
                        open
                        title='INFO'
                        style={{ textAlign: 'center', alignItems: 'center' }}
                     >
                        <p>
                           <Avatar
                              src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                              name=''
                              style={{ marginLeft: '30px' }}
                           />
                        </p>
                        <p>{getUsernameById?.name}</p>
                        <p>{getUsernameById?.email}</p>
                     </ExpansionPanel>
                     <ExpansionPanel title='TEXT'>
                        <p>Dummy Text</p>
                     </ExpansionPanel>
                  </Sidebar>
               )}
            </MainContainer>
         </div>
      </>
   );
}

export default MessagePage;
