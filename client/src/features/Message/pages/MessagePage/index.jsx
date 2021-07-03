import {
   Avatar,
   ChatContainer,
   ConversationHeader,
   EllipsisButton,
   ExpansionPanel,
   MainContainer,
   MessageInput,
   MessageList,
   Sidebar,
   VideoCallButton,
   VoiceCallButton,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import conversationApi from '../../../../api/conversationApi';
import userApi from '../../../../api/userApi';
import MessageChat from '../../components/MessageChat';
import SideBarLeft from '../../components/MessageSideBar';
const uniqid = require('uniqid');

function MessagePage(props) {
   const userId = useSelector((state) => state.users.id);

   // const location = useLocation();
   // const newMessageComing = location.state?.newMessageComing;
   // console.log('currentSelectedChat: ', newMessageComing);

   const socket = useRef();
   const [conversation, setConversation] = useState([]);
   const [currentChat, setCurrentChat] = useState(
      JSON.parse(localStorage.getItem('selectedConversation'))
   );
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
      });
   }, []);

   // console.log('Arrival message: ', arrivalMessage);
   // console.log('SocketId: ', socket.current?.id);

   useEffect(() => {
      // console.log('currentChat?.members: ', currentChat?.members);
      // console.log('arrivalMessage: ', arrivalMessage);
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage, currentChat]);

   useEffect(() => {
      if (!userId) return;
      socket.current.emit('addUser', userId);
      // socket.current.on('getUsers', (users) => {
      //    console.log('User is online: ', users);
      // });
   }, [userId]);

   useEffect(() => {
      const getConversation = async () => {
         try {
            if (!userId) return;

            const response = await conversationApi.getConversation(userId);
            // console.log('Conversation: ', response);
            setConversation(response);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getConversation();
   }, [userId, arrivalMessage]);

   const onClickUser = (conversation) => {
      setCurrentChat(conversation);
      console.log('conversation is', conversation);
   };

   useEffect(() => {
      const getMessage = async () => {
         const currentId = currentChat?.id;
         if (!currentId) return;
         try {
            const response = await conversationApi.getMessage(currentId);
            setMessages(response);
            console.log('Message: ', response);
         } catch (err) {
            console.log(err);
         }
      };
      getMessage();
      // console.log('currentChat', currentChat);
   }, [
      currentChat,
      // arrivalMessage
   ]);

   const handleMessageInputSubmit = async () => {
      if (!userId) return;
      const message = {
         sender: userId,
         text: newMessage,
         conversationId: currentChat?.id,
      };

      const receiverId = currentChat.members.find(
         (member) => member !== userId
      );

      console.log('receiverId sendMessage: ', receiverId);
      console.log('userId sendMessage: ', userId);
      console.log('text sendMessage: ', newMessage);

      socket.current.emit('sendMessage', {
         senderId: userId,
         receiverId: receiverId,
         text: newMessage,
      });

      try {
         const response = await conversationApi.sendMessage(message);
         setMessages([...messages, response]);
         setNewMessage('');
      } catch (error) {
         console.log('error: ', error);
      }
   };

   useEffect(() => {
      const receiverIdInGroup = currentChat?.members.filter(
         (user) => user !== userId
      );
      console.log('receiverIdInGroup: ', receiverIdInGroup);
      const getUsernameByIdFunction = async () => {
         try {
            if (
               !userId ||
               !receiverIdInGroup ||
               receiverIdInGroup.includes(userId)
            )
               return;

            const response = await userApi.getFriendsId({
               uid: receiverIdInGroup,
            });

            setGetUsernameById(response);
         } catch (error) {
            console.log(error);
         }
      };
      getUsernameByIdFunction();
   }, [userId, currentChat?.members]);

   localStorage.removeItem('selectedConversation');

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
                           src={getUsernameById?.photoURL}
                           name={getUsernameById?.displayName}
                        />
                        <ConversationHeader.Content
                           userName={getUsernameById?.email}
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
                                 own={m.sender === userId}
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
                              src={getUsernameById?.photoURL}
                              name={getUsernameById?.displayName}
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
