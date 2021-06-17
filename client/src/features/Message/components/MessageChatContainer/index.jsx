import React from 'react';
import {
   ConversationHeader,
   VoiceCallButton,
   VideoCallButton,
   Avatar,
   EllipsisButton,
   ChatContainer,
   MessageInput,
   Message,
   MessageList,
} from '@chatscope/chat-ui-kit-react';

function Container(props) {
   return (
      <ChatContainer>
         <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
               src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
               name='Zoe'
            />
            <ConversationHeader.Content
               userName='Zoe'
               info='Active 10 mins ago'
            />
            <ConversationHeader.Actions>
               <VoiceCallButton />
               <VideoCallButton />
               <EllipsisButton orientation='vertical' />
            </ConversationHeader.Actions>
         </ConversationHeader>

         <MessageList>
            <Message
               model={{
                  message: 'Hello my friend',
                  sentTime: '15 mins ago',
                  sender: 'Zoe',
                  direction: 'incoming',
                  position: 'single',
               }}
            >
               <Avatar
                  src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
                  name='Zoe'
               />
            </Message>

            <Message
               model={{
                  message: 'Hello my friend',
                  sentTime: '15 mins ago',
                  sender: 'Patrik',
                  direction: 'outgoing',
                  position: 'single',
               }}
            />
         </MessageList>

         <MessageInput placeholder='Type message here' />
      </ChatContainer>
   );
}

export default Container;
