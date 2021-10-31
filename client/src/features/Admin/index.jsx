import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function Admin(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={`${match.url}/dashboard`} component={AdminPage} />
      </Switch>
   );
}

export default Admin;
