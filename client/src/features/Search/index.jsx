import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

function SearchBar(props) {
   const match = useRouteMatch();
   console.log({ match });

   return (
      <Switch>
         <Route exact path={match.url} component={SearchPage} />
      </Switch>
   );
}

export default SearchBar;
