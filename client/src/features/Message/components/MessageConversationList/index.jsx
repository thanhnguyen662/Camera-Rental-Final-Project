import { Avatar, Conversation } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';

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
            const res = await axios.get(
               'http://localhost:4000/account?userId=' + friendId,
               { withCredentials: true }
            );
            console.log(res.data);
            setUser(res.data);
         } catch (err) {
            console.log(err);
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
