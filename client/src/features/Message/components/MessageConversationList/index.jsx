import { Avatar, Conversation } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';

function Message(props) {
   const { conversation, lastMessage } = props;
   const userId = useSelector((state) => state.users.id);
   const [user, setUser] = useState(null);

   useEffect(() => {
      const friendId = conversation.members.find((m) => m !== userId);
      const getUser = async () => {
         try {
            if (!friendId) return;

            const response = await userApi.getFriendsId({ uid: friendId });
            setUser(response);
         } catch (error) {
            console.log(error);
         }
      };

      getUser();
   }, [userId, conversation]);

   return (
      <Conversation
         name={user?.email}
         info={
            conversation.messages[lastMessage]?.text ||
            'No message in conversation'
         }
      >
         <Avatar src={user?.photoURL} name={user?.displayName} />
      </Conversation>
   );
}

export default Message;
