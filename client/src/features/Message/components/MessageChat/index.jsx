import { Message } from '@chatscope/chat-ui-kit-react';
import React from 'react';

function MessageChat(props) {
   const { message, own } = props;

   return (
      <Message
         model={
            own
               ? {
                    message: message.text,
                    sentTime: message.createAt,
                    direction: 'outgoing',
                 }
               : {
                    message: message.text,
                    sentTime: message.createAt,
                    direction: 'incoming',
                 }
         }
      />
   );
}

export default MessageChat;
