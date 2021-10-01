// import PropTypes from 'prop-types';
import {
   Avatar,
   ChatContainer,
   ConversationHeader,
   MessageInput,
   MessageList,
} from '@chatscope/chat-ui-kit-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import conversationBeta1Api from '../../../../api/conversationBeta1Api';
import SendImageModal from '../../../MessageBeta/components/SendImageModal';
import MessageDetail from '../MessageDetail';

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

   const [conversationInfo, setConversationInfo] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState('');

   useEffect(() => {
      if (!userId) return;
      const getMessageInConversation = async () => {
         try {
            const response = await conversationBeta1Api.getMessage({
               userId: userId,
               conversationId: conversationId,
            });
            console.log('message list: ', response.messages);
            setConversationInfo(response.members[0]);
            setMessages(response.messages);
         } catch (error) {
            console.log(error);
         }
      };
      getMessageInConversation();
   }, [conversationId, userId]);

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
                  <MessageDetail messages={messages} userId={userId} />
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
