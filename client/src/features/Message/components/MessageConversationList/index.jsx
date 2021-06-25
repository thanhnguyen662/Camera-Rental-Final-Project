import { Avatar, Conversation } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';

function Message(props) {
   const { conversation } = props;
   const userId = useSelector((state) => state.users.id);
   const [user, setUser] = useState(null);

   useEffect(() => {
      const friendId = conversation.members.find((m) => m !== userId);
      const getUser = async () => {
         try {
            if (!friendId) return;
            // const response = await axios.get(
            //    `http://localhost:4000/account/getUserByUid?uid=${friendId}`,
            //    { withCredentials: true }
            // );
            // const params = { uid: friendId };
            const response = await userApi.getFriendsId({ uid: friendId });
            setUser(response);
         } catch (error) {
            console.log(error);
         }
      };

      // const friendsIsOnline =

      getUser();
   }, [userId, conversation]);

   return (
      <Conversation name={user?.email}>
         <Avatar
            src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
            name='Lilly'
         />
      </Conversation>
   );
}

export default Message;
