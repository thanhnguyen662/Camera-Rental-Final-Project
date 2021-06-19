import { Avatar, Conversation } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Message(props) {
   const { conversation } = props;
   const userId = useSelector((state) => state.users.id);
   const [user, setUser] = useState(null);

   useEffect(() => {
      const friendId = conversation.members.find(
         (m) => parseInt(m) !== parseInt(userId)
      );

      const getUser = async () => {
         try {
            if (!friendId) return;
            const response = await axios.get(
               `http://localhost:4000/account?userId=${friendId}`,
               { withCredentials: true }
            );
            console.log(response.data);
            setUser(response.data);
         } catch (error) {
            console.log(error);
         }
      };

      getUser();
   }, [userId, conversation]);

   return (
      <Conversation
         name={user?.name}
         lastSenderName={user?.name}
         info='Yes i can do it for you'
      >
         <Avatar
            src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
            name='Lilly'
            status='available'
         />
      </Conversation>
   );
}

export default Message;
