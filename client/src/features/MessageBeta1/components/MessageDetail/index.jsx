import PropTypes from 'prop-types';
import { Avatar, Message } from '@chatscope/chat-ui-kit-react';
import React from 'react';

MessageDetail.propTypes = {
   messages: PropTypes.array,
   userId: PropTypes.string,
};

MessageDetail.defaultProps = {
   messages: [],
   userId: '',
};

function MessageDetail(props) {
   const { messages, userId } = props;

   const inComingMessage = (message) => {
      return (
         <Message
            key={message.id}
            model={{
               direction: 'incoming',
               message: message.content,
               sender: message.user.username,
            }}
         >
            <Avatar name={message.user.username} src={message.user.photoURL} />
         </Message>
      );
   };

   const outgoingMessage = (message) => {
      return (
         <Message
            key={message.id}
            model={{
               direction: 'outgoing',
               message: message.content,
               sender: message.user.username,
            }}
         />
      );
   };

   return (
      <>
         {messages.map((message) => {
            if (message.user.firebaseId === userId) {
               return outgoingMessage(message);
            } else {
               return inComingMessage(message);
            }
         })}
      </>
   );
}

export default MessageDetail;
