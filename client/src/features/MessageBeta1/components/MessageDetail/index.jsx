import { Avatar, Message } from '@chatscope/chat-ui-kit-react';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MessageDetail.scss';

MessageDetail.propTypes = {
   messages: PropTypes.array,
   userId: PropTypes.string,
   handlePageChange: PropTypes.func,
};

MessageDetail.defaultProps = {
   messages: [],
   userId: '',
   handlePageChange: null,
};

function MessageDetail(props) {
   const { messages, userId, handlePageChange } = props;

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
         <div id='scrollableDiv' className='messageDetail'>
            <InfiniteScroll
               dataLength={messages?.length}
               next={handlePageChange}
               inverse={true}
               hasMore={true}
               scrollableTarget='scrollableDiv'
            >
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
            </InfiniteScroll>
         </div>
      </>
   );
}

export default MessageDetail;
