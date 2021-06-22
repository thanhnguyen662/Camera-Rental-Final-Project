import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';

function Product(props) {
   const match = useRouteMatch();
   console.log('Product: ', { match });

   return (
      <Switch>
         <Route exact path={match.url} component={ProductPage} />

         <Route path={`${match.url}/:slug`} component={ProductDetailPage} />
      </Switch>
   );
}

export default Product;
