import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

Register.propTypes = {};

function Register(props) {
   const match = useRouteMatch();
   console.log({ match });

   return (
      <Switch>
         <Route exact path={match.url} component={RegisterPage} />
      </Switch>
   );
}

export default Register;
