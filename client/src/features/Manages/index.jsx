import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ManageLayoutForUser from '../../layouts/ManageLayoutForUser';
import ManagesLayoutForShop from '../../layouts/ManagesLayoutForShop';
import ManageAcceptOrderPage from './pages/ForShop/ManageAcceptOrderPage';
import ManageBackOrderPage from './pages/ForShop/ManageBackOrderPage';
import ManageFailureOrderPage from './pages/ForShop/ManageFailureOrderPage';
import ManagePendingOrderPage from './pages/ForShop/ManagePendingOrderPage';
import ManageRentedOrderPage from './pages/ForShop/ManageRentedOrderPage';
import ManageRevenueOverviewPage from './pages/ForShop/ManageRevenueOverviewPage';
import ManageAcceptOrderUserPage from './pages/ForUser/ManageAcceptOrderUserPage';
import ManageBackOrderUserPage from './pages/ForUser/ManageBackOrderUserPage';
import ManageFailureOrderUserPage from './pages/ForUser/ManageFailureOrderUserPage';
import ManagePendingOrderUserPage from './pages/ForUser/ManagePendingOrderUserPage';
import ManageRentedOrderUserPage from './pages/ForUser/ManageRentedOrderUserPage';
import ManageMyProductPage from './pages/ManageMyProductPage';
import ManageOrderDetail from './pages/ManageOrderDetailPage';

function Manages(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route path={`${match.url}/shop`}>
            <ManagesLayoutForShop>
               <Switch>
                  <Route
                     path={`${match.url}/shop/order/:orderId`}
                     component={ManageOrderDetail}
                  />
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
            </ManagesLayoutForShop>
         </Route>
         <Route path={`${match.url}/user`}>
            <ManageLayoutForUser>
               <Switch>
                  <Route
                     path={`${match.url}/user/order/:orderId`}
                     component={ManageOrderDetail}
                  />
                  <Route
                     path={`${match.url}/user/pending`}
                     component={ManagePendingOrderUserPage}
                  />
                  <Route
                     path={`${match.url}/user/accept`}
                     component={ManageAcceptOrderUserPage}
                  />
                  <Route
                     path={`${match.url}/user/back`}
                     component={ManageBackOrderUserPage}
                  />
                  <Route
                     path={`${match.url}/user/rented`}
                     component={ManageRentedOrderUserPage}
                  />
                  <Route
                     path={`${match.url}/user/failure`}
                     component={ManageFailureOrderUserPage}
                  />
               </Switch>
            </ManageLayoutForUser>
         </Route>
      </Switch>
   );
}

export default Manages;
