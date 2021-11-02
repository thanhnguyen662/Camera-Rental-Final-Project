// import React, { useEffect, useState } from 'react';
// import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
// import PropTypes from 'prop-types';
// import userApi from '../../../../api/userApi';
// import './Conversations.scss';

// Conversations.propTypes = {
//    conversation: PropTypes.object,
//    currentUserId: PropTypes.string,
//    handleOnClickConversation: PropTypes.func,
// };

// Conversations.defaultProps = {
//    conversation: {},
//    currentUserId: '',
//    handleOnClickConversation: null,
// };

// function Conversations(props) {
//    const {
//       conversation,
//       currentUserId,
//       handleOnClickConversation,
//       selectedConversationId,
//       lastMessage,
//    } = props;
//    const [friendInfo, setFriendInfo] = useState({});

//    const activeConversation = conversation.id === selectedConversationId && {
//       active: true,
//    };

//    useEffect(() => {
//       const friendId = conversation.members?.find(
//          (friendId) => friendId !== currentUserId
//       );
//       const getFriend = async () => {
//          try {
//             const response = await userApi.getUserProfile({
//                firebaseId: friendId,
//             });

//             setFriendInfo(response);
//          } catch (error) {
//             console.log(error);
//          }
//       };
//       getFriend();
//    }, [conversation, currentUserId]);

//    return (
//       <>
//          <Conversation
//             name={friendInfo.username}
//             info={
//                lastMessage?.split('.').length === 6 &&
//                lastMessage?.split('.')[0] === 'https://firebasestorage' &&
//                lastMessage?.split('.')[2] ===
//                   'com/v0/b/camera-rental-firbase' ? (
//                   <b>Image</b>
//                ) : (
//                   lastMessage
//                )
//             }
//             onClick={() => handleOnClickConversation(conversation)}
//             {...activeConversation}
//          >
//             <Avatar src={friendInfo.photoURL} name={friendInfo.username} />
//          </Conversation>
//       </>
//    );
// }

// export default Conversations;
