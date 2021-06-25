import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LadingPage from '../Lading/pages/LandingPage';

function Lading(props) {
   const match = useRouteMatch();
   console.log('Lading: ', { match });
   return (
      <Switch>
         <Route exact path={match.url} component={LadingPage} />
      </Switch>
   );
}

export default Lading;
