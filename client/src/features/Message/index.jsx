import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MessagePage from './pages/MessagePage';

function Message(props) {
   const match = useRouteMatch();
   console.log('Message: ', { match });

   return (
      <Switch>
         <Route exact path={match.url} component={MessagePage} />
      </Switch>
   );
}

export default Message;
