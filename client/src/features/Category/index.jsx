import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';

function Category(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route
            path={`${match.url}/:categoryName/:sortBy`}
            component={CategoryPage}
         />
      </Switch>
   );
}

export default Category;
