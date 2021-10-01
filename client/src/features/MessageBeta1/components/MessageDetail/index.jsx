import PropTypes from 'prop-types';
import { Avatar, Message } from '@chatscope/chat-ui-kit-react';
import React from 'react';
import { Image } from 'antd';

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

   const imageInComingMessage = (message) => {
      return (
         <Message
            key={message.id}
            model={{
               direction: 'incoming',
               sender: message.user.username,
            }}
            style={{ cursor: 'pointer' }}
         >
            <Avatar name={message.user.username} src={message.user.photoURL} />
            <Message.CustomContent>
               <Image src={message.content} width={160} />
            </Message.CustomContent>
         </Message>
      );
   };

   const imageOutGoingMessage = (message) => {
      return (
         <Message
            key={message.id}
            model={{
               direction: 'outgoing',
               sender: message.user.username,
            }}
            style={{ cursor: 'pointer' }}
         >
            <Message.CustomContent>
               <Image src={message.content} width={160} />
            </Message.CustomContent>
         </Message>
      );
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
         {messages.map((message) => {
            if (message.user.firebaseId === userId) {
               return isType(message.content) === 'text'
                  ? outgoingMessage(message)
                  : imageOutGoingMessage(message);
            }
            if (message.user.firebaseId !== userId) {
               return isType(message.content) === 'text'
                  ? inComingMessage(message)
                  : imageInComingMessage(message);
            }
            return null;
         })}
      </>
   );
}

export default MessageDetail;
