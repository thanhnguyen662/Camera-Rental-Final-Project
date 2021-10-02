// import PropTypes from 'prop-types';
import {
   Avatar,
   ChatContainer,
   ConversationHeader,
   MessageInput,
   MessageList,
} from '@chatscope/chat-ui-kit-react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import conversationBeta1Api from '../../../../api/conversationBeta1Api';
import SendImageModal from '../SendImageModal';
import MessageDetail from '../MessageDetail';
import SidebarToolbox from '../SidebarToolbox';

ChatContent.propTypes = {
   userId: PropTypes.string,
   username: PropTypes.string,
   photoURL: PropTypes.string,
   handleUpdateLatestMessage: PropTypes.func,
   socket: PropTypes.object,
   socketMessage: PropTypes.object,
};

ChatContent.defaultProps = {
   userId: '',
   username: '',
   photoURL: '',
   handleUpdateLatestMessage: null,
   socket: {},
   socketMessage: {},
};

function ChatContent(props) {
   const {
      userId,
      photoURL,
      username,
      handleUpdateLatestMessage,
      socket,
      socketMessage,
   } = props;
   const { conversationId } = useParams();
   const ref = useRef();

   const [conversationInfo, setConversationInfo] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [messages, setMessages] = useState([]);
   const [page, setPage] = useState(1);
   const [input, setInput] = useState('');

   useEffect(() => {
      setPage(1);
      setMessages([]);
   }, [conversationId]);

   useEffect(() => {
      if (!userId) return;
      if (page > 1) {
         if (ref.current === page) return;
      }
      const getMessageInConversation = async () => {
         try {
            const response = await conversationBeta1Api.getMessage({
               userId: userId,
               conversationId: conversationId,
               page: page,
               take: 20,
            });
            response.messages.sort(
               (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            setConversationInfo(response.members[0]);
            setMessages((prev) => [...response.messages, ...prev]);
         } catch (error) {
            console.log(error);
         }
      };
      getMessageInConversation();
   }, [conversationId, userId, page]);

   useEffect(() => {
      ref.current = page;
   }, [page]);

   useEffect(() => {
      if (
         !Object.keys(socketMessage).length ||
         socketMessage.conversationId !== conversationId
      )
         return;
      setMessages((prev) => [
         ...prev,
         {
            ...socketMessage,
            conversationId: Number(socketMessage.conversationId),
            user: socketMessage.sender,
         },
      ]);
   }, [socketMessage, conversationId]);

   const onSendMessage = async (imageURL) => {
      try {
         const formDataDb = {
            conversationId: conversationId,
            content: imageURL || input,
            userId: userId,
         };
         const response = await conversationBeta1Api.sendMessage(formDataDb);
         setMessages([...messages, response]);
         handleUpdateLatestMessage(response, conversationId);

         const formDataSocket = {
            ...formDataDb,
            createdAt: new Date(),
            receiver: conversationInfo.user,
            sender: { userId, username, photoURL },
         };
         socket.current.emit('message', formDataSocket);
         setInput('');
      } catch (error) {
         console.log(error);
      }
   };

   const handleIsModalVisible = () => {
      setIsModalVisible(false);
   };

   const handlePageChange = () => {
      setPage(page + 1);
   };

   return (
      <>
         <ChatContainer>
            <ConversationHeader>
               <ConversationHeader.Back />
               <Avatar
                  src={conversationInfo?.user.photoURL}
                  name={conversationInfo?.user.username}
               />
               <ConversationHeader.Content
                  userName={conversationInfo?.user.username}
               />
            </ConversationHeader>
            <MessageList>
               <div as='Message'>
                  <MessageDetail
                     messages={messages}
                     userId={userId}
                     handlePageChange={handlePageChange}
                     page={page}
                  />
               </div>
            </MessageList>
            <MessageInput
               placeholder='Type message here'
               value={input}
               onChange={(value) => setInput(value)}
               onSend={onSendMessage}
               onAttachClick={() => setIsModalVisible(true)}
            />
         </ChatContainer>
         <SidebarToolbox conversationId={conversationId} />
         <SendImageModal
            isModalVisible={isModalVisible}
            handleIsModalVisible={handleIsModalVisible}
            conversationId={conversationId}
            onSendMessage={onSendMessage}
         />
      </>
   );
}

export default ChatContent;
