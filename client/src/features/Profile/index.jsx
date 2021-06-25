import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

Profile.propTypes = {};

function Profile(props) {
   const match = useRouteMatch();
   console.log('Profile: ', { match });

   return (
      <Switch>
         <Route exact path={match.url} component={ProfilePage} />

         <Route path={`${match.url}/:profileId`} component={ProfilePage} />
      </Switch>
   );
}

export default Profile;
