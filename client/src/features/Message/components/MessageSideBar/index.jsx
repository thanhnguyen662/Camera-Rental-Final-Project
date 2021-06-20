import {
   ConversationList,
   Sidebar,
   Search,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import MessageConversationList from '../MessageConversationList';

SideBar.propsTypes = {
   conversations: PropTypes.array,
};

SideBar.defaultProps = {
   conversations: [],
};

function SideBar(props) {
   const { conversations, onClickUser } = props;

   return (
      <>
         <Sidebar position='left' scrollable={false}>
            <Search placeholder='Search...' />
            <ConversationList>
               {conversations.map((conversation) => (
                  <div
                     onClick={() => onClickUser(conversation)}
                     key={conversation.id}
                  >
                     <MessageConversationList
                        key={conversation.id}
                        conversation={conversation}
                     />
                  </div>
               ))}
            </ConversationList>
         </Sidebar>
      </>
   );
}

export default SideBar;
