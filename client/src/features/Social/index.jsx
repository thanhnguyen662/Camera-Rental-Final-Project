import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SocialPage from './pages/SocialPage';

function Lading(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={SocialPage} />
      </Switch>
   );
}

export default Lading;
