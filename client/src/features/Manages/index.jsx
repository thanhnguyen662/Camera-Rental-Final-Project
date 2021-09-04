import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ManagePendingOrderPage from './pages/ManagePendingOrderPage';
import ManageMyProductPage from './pages/ManageMyProductPage';
import ManageRevenueOverviewPage from './pages/ManageRevenueOverviewPage';
import ManageAcceptOrderPage from './pages/ManageAcceptOrderPage';
import ManageRentedOrderPage from './pages/ManageRentedOrderPage';
import ManageBackOrderPage from './pages/ManageBackOrderPage';
import ManageFailureOrderPage from './pages/ManageFailureOrderPage';

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
         <Route
            path={`${match.url}/shop/accept`}
            component={ManageAcceptOrderPage}
         />
         <Route
            path={`${match.url}/shop/rented`}
            component={ManageRentedOrderPage}
         />
         <Route
            path={`${match.url}/shop/back`}
            component={ManageBackOrderPage}
         />
         <Route
            path={`${match.url}/shop/failure`}
            component={ManageFailureOrderPage}
         />
      </Switch>
   );
}

export default Manages;
