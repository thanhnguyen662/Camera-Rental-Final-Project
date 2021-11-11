import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import SignPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
// import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

// const { Content } = Layout;

function Auth(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={SignPage} />
         <Route path={`${match.url}/login`} component={SignPage} />
         <Route path={`${match.url}/register`} component={RegisterPage} />
      </Switch>
   );
}

export default Auth;
