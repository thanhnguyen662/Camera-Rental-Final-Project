import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ManagePendingOrderPage from './pages/ManagePendingOrderPage';
import ManageMyProductPage from './pages/ManageMyProductPage';
import ManageRevenueOverviewPage from './pages/ManageRevenueOverviewPage';

Manages.propTypes = {};

function Manages(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route
            path={`${match.url}/shop/revenue`}
            component={ManageRevenueOverviewPage}
         />
         <Route
            path={`${match.url}/shop/product`}
            component={ManageMyProductPage}
         />
         <Route
            path={`${match.url}/shop/pending`}
            component={ManagePendingOrderPage}
         />
      </Switch>
   );
}

export default Manages;
