import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../features/Login';
import Profile from '../features/Profile';
import Register from '../features/Register';
import Message from '../features/Message';
import ContentLayout from '../layouts/Content';
import MainLayout from '../layouts/Main';
import Product from '../features/Product';
import ProfileLayout from '../layouts/Profile';
import CarouselBar from '../components/CarouselBar';

function Routers(props) {
   return (
      <Router>
         <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/message' component={Message} />

            <Route>
               <MainLayout>
                  <Switch>
                     <Route exact path='/'>
                        <CarouselBar />
                        <ContentLayout>
                           <Product />
                        </ContentLayout>
                     </Route>

                     <Route exact path='/profile'>
                        <ProfileLayout>
                           <Profile />
                        </ProfileLayout>
                     </Route>
                  </Switch>
               </MainLayout>
            </Route>
         </Switch>
      </Router>
   );
}

export default Routers;
