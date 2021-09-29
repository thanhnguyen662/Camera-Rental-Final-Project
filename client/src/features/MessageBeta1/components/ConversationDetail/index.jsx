import React from 'react';
import PropTypes from 'prop-types';
import { Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import { useHistory } from 'react-router';

ConversationDetail.propTypes = {
   conversations: PropTypes.array,
};

ConversationDetail.defaultProps = {
   conversations: [],
};

function ConversationDetail(props) {
   const { conversations } = props;
   const history = useHistory();

   const onClickConversation = (conversation) => {
      history.push(`/messageBeta1/${conversation.id}`);
   };

   return (
      <>
         {conversations?.map((conversation) => (
            <Conversation
               key={conversation.id}
               name={conversation.members[0].user.username}
               info={
                  conversation.messages[0]
                     ? conversation.messages[0].content
                     : 'No Message'
               }
               onClick={() => onClickConversation(conversation)}
            >
               <Avatar src={conversation.members[0].user.photoURL} />
            </Conversation>
         ))}
      </>
   );
}

export default ConversationDetail;
