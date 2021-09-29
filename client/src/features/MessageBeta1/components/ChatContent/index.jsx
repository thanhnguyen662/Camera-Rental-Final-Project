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
import MessageDetail from '../MessageDetail';

ChatContent.propTypes = {
   userId: PropTypes.string,
   input: PropTypes.string,
   handleInput: PropTypes.func,
   handleSend: PropTypes.func,
};

ChatContent.defaultProps = {
   userId: '',
   input: '',
   handleInput: null,
   handleSend: null,
};

function ChatContent(props) {
   const { userId, input, handleInput, handleSend } = props;
   const { conversationId } = useParams();
   const [conversationMessage, setConversationMessage] = useState(null);

   useEffect(() => {
      if (!userId) return;
      const getMessageInConversation = async () => {
         try {
            const response = await conversationBeta1Api.getMessage({
               userId: userId,
               conversationId: conversationId,
            });
            setConversationMessage(response);
         } catch (error) {
            console.log(error);
         }
      };
      getMessageInConversation();
   }, [conversationId, userId]);

   return (
      <>
         <ChatContainer>
            <ConversationHeader>
               <ConversationHeader.Back />
               <Avatar
                  src={conversationMessage?.members[0].user.photoURL}
                  name={conversationMessage?.members[0].user.username}
               />
               <ConversationHeader.Content
                  userName={conversationMessage?.members[0].user.username}
               />
            </ConversationHeader>
            <MessageList>
               <div as='Message'>
                  <MessageDetail
                     messages={conversationMessage?.messages}
                     userId={userId}
                  />
               </div>
            </MessageList>
            <MessageInput
               placeholder='Type message here'
               value={input}
               onChange={(value) => handleInput(value)}
               onSend={handleSend}
            />
         </ChatContainer>
      </>
   );
}

export default ChatContent;
