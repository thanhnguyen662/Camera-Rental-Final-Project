import {
   ConversationList,
   Search,
   Sidebar,
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
   const { conversations } = props;

   return (
      <>
         <Sidebar position='left' scrollable={false}>
            <Search placeholder='Search...' />
            <ConversationList>
               {conversations.map((c) => (
                  <MessageConversationList key={c.id} conversation={c} />
               ))}
            </ConversationList>
         </Sidebar>
      </>
   );
}

export default SideBar;
