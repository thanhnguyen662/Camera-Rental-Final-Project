import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
// import ProfileUserPage from './pages/ProfileUserPage';

Profile.propTypes = {};

function Profile(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route path={`${match.url}/edit`} component={ProfileEditPage} />
         <Route path={`${match.url}/:userId`} component={ProfilePage} />
      </Switch>
   );
}

export default Profile;
