import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ManageAcceptOrderPage from './pages/ForShop/ManageAcceptOrderPage';
import ManageBackOrderPage from './pages/ForShop/ManageBackOrderPage';
import ManageFailureOrderPage from './pages/ForShop/ManageFailureOrderPage';
import ManagePendingOrderPage from './pages/ForShop/ManagePendingOrderPage';
import ManageRentedOrderPage from './pages/ForShop/ManageRentedOrderPage';
import ManageRevenueOverviewPage from './pages/ForShop/ManageRevenueOverviewPage';
import ManageOrderDetail from './pages/ManageOrderDetailPage';
import ManageMyProductPage from './pages/ManageMyProductPage';

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
         <Route
            path={`${match.url}/order/:orderId`}
            component={ManageOrderDetail}
         />
      </Switch>
   );
}

export default Manages;
