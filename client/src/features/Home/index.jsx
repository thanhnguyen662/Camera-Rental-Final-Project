import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HomePage from './pages/HomePage';

function Home(props) {
   const match = useRouteMatch();
   return (
      <div>
         <Switch>
            <Route exact path={match.url} component={HomePage} />
         </Switch>
      </div>
   );
}

export default Home;
