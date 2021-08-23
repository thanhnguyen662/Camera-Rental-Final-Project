import { Avatar, Message } from '@chatscope/chat-ui-kit-react';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './Messages.scss';

Messages.propTypes = {
   message: PropTypes.object,
   currentUserId: PropTypes.string,
};

Messages.defaultProps = {
   message: {},
   currentUserId: '',
};

function Messages(props) {
   const { message, currentUserId, friendInfo, redirectData } = props;

   return (
      <>
         {(() => {
            if (message?.sender !== currentUserId) {
               if (
                  message.text.split('.').length === 6 &&
                  message.text.split('.')[0] === 'https://firebasestorage' &&
                  message.text.split('.')[2] ===
                     'com/v0/b/camera-rental-firbase'
               ) {
                  return (
                     <Message
                        model={{
                           direction: 'incoming',
                           sender: friendInfo.username,
                        }}
                        style={{ cursor: 'pointer' }}
                     >
                        <Avatar
                           src={friendInfo?.photoURL || redirectData?.photoURL}
                           name={friendInfo?.username || redirectData?.username}
                        />
                        <Message.CustomContent>
                           <Image src={message.text} width={160} />
                        </Message.CustomContent>
                     </Message>
                  );
               } else {
                  return (
                     <Message
                        model={{
                           message: message.text,
                           direction: 'incoming',
                           sender: friendInfo.username,
                        }}
                     >
                        <Avatar
                           src={friendInfo?.photoURL || redirectData?.photoURL}
                           name={friendInfo?.username || redirectData?.username}
                        />
                     </Message>
                  );
               }
            }
            if (
               message.text.split('.').length === 6 &&
               message.text.split('.')[0] === 'https://firebasestorage' &&
               message.text.split('.')[2] === 'com/v0/b/camera-rental-firbase'
            ) {
               return (
                  <Message
                     model={{
                        direction: 'outgoing',
                        sender: friendInfo.username,
                     }}
                  >
                     <Message.CustomContent>
                        <Image src={message.text} width={160} />
                     </Message.CustomContent>
                  </Message>
               );
            } else {
               return (
                  <Message
                     model={{
                        message: message.text,
                        direction: 'outgoing',
                        position: 'normal',
                     }}
                  />
               );
            }
         })()}
      </>
   );
}

export default Messages;
