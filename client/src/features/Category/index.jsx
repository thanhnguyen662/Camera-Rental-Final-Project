import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';

function Category(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={`${match.url}`} component={CategoryPage} />
      </Switch>
   );
}

export default Category;
