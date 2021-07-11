import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PromotionPage from './pages/PromotionPage';

function Promotion(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={`${match.url}`} component={PromotionPage} />
      </Switch>
   );
}

export default Promotion;
