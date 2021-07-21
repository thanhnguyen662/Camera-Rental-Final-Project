import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Message } from '@chatscope/chat-ui-kit-react';

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
         {message?.sender !== currentUserId ? (
            <Message
               model={{
                  message: message.text,
                  direction: 'incoming',
                  sender: friendInfo.username,
               }}
            >
               <Avatar
                  src={friendInfo?.photoURL || redirectData?.photoURL}
                  name={friendInfo.username || redirectData?.username}
               />
            </Message>
         ) : (
            <Message
               model={{
                  message: message.text,
                  direction: 'outgoing',
               }}
            />
         )}
      </>
   );
}

export default Messages;
