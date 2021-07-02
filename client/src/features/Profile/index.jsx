import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfileUserPage from './pages/ProfileUserPage';

Profile.propTypes = {};

function Profile(props) {
   const match = useRouteMatch();
   console.log('Profile: ', { match });

   return (
      <Switch>
         <Route exact path={match.url} component={ProfilePage} />
         <Route path={`${match.url}/edit`} component={ProfileEditPage} />
         <Route path={`${match.url}/:firebaseId`} component={ProfileUserPage} />
      </Switch>
   );
}

export default Profile;
