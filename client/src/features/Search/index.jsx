import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

function Search(props) {
   const match = useRouteMatch();
   console.log({ match });

   return (
      <Switch>
         <Route path={`${match.url}/:type/:keyword`} component={SearchPage} />
      </Switch>
   );
}

export default Search;
