import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import MessageBeta1page from './pages/MessageBeta1Page';

function MessageBeta1(props) {
   const match = useRouteMatch();

   return (
      <>
         <Switch>
            <Route path={match.url} component={MessageBeta1page} />
         </Switch>
      </>
   );
}

export default MessageBeta1;
