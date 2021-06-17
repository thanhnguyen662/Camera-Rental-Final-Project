import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductPage from './pages/ProductPage';

function Product(props) {
   const match = useRouteMatch();
   console.log({ match });

   return (
      <Switch>
         <Route exact path={match.url} component={ProductPage} />
      </Switch>
   );
}

export default Product;
