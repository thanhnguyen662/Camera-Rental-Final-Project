import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

Profile.propTypes = {};

function Profile(props) {
   const match = useRouteMatch();
   console.log({ match });

   return (
      <Switch>
         <Route exact path={match.url} component={ProfilePage} />
      </Switch>
   );
}

export default Profile;
