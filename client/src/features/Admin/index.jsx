import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminProductPage from './pages/AdminProductPage';

function Admin(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route
            exact
            path={`${match.url}/product`}
            component={AdminProductPage}
         />
      </Switch>
   );
}

export default Admin;
