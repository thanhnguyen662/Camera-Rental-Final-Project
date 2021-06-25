import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginPage from '../Login/pages/LoginPage';

Login.propTypes = {};

function Login(props) {
   const match = useRouteMatch();
   console.log('Login: ', { match });

   return (
      <Switch>
         <Route exact path={match.url} component={LoginPage} />
      </Switch>
   );
}

export default Login;
