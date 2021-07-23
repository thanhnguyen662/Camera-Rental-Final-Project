import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MapsPage from './pages/MapsPage';

function Maps(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={MapsPage} />
      </Switch>
   );
}

export default Maps;
