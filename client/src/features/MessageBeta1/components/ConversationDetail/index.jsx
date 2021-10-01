import React from 'react';
import PropTypes from 'prop-types';
import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import { useHistory, useLocation } from 'react-router';

ConversationDetail.propTypes = {
   conversations: PropTypes.array,
};

ConversationDetail.defaultProps = {
   conversations: [],
};

function ConversationDetail(props) {
   const { conversations } = props;
   const history = useHistory();
   const location = useLocation();

   const onClickConversation = (conversation) => {
      history.push(`/messageBeta1/${conversation.id}`);
   };

   const isActiveConversation = (conversationId) => {
      if (Number(location.pathname.split('/')[2]) === conversationId)
         return true;
      return false;
   };

   const latestMessage = (message) => {
      if (message) {
         return isType(message.content) === 'text' ? (
            message.content
         ) : (
            <b>Image</b>
         );
      } else {
         return <b>No Message</b>;
      }
   };

   const isType = (content) => {
      if (
         content.split('.').length === 6 &&
         content.split('.')[0] === 'https://firebasestorage' &&
         content.split('.')[2] === 'com/v0/b/camera-rental-firbase'
      ) {
         return 'image';
      } else {
         return 'text';
      }
   };

   return (
      <>
         {conversations?.map((conversation) => (
            <Conversation
               key={conversation.id}
               name={conversation.members[0].user.username}
               onClick={() => onClickConversation(conversation)}
               active={isActiveConversation(conversation.id)}
               info={latestMessage(conversation.messages[0])}
            >
               <Avatar src={conversation.members[0].user.photoURL} />
            </Conversation>
         ))}
      </>
   );
}

export default ConversationDetail;
