import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CarouselBar from '../components/CarouselBar';
import Login from '../features/Login';
import Message from '../features/Message';
import Product from '../features/Product';
import Profile from '../features/Profile';
import Register from '../features/Register';
import ContentLayout from '../layouts/Content';
import MainLayout from '../layouts/Main';
import ProfileLayout from '../layouts/Profile';

function Routers(props) {
   return (
      <Router>
         <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <Route>
               <MainLayout>
                  <Switch>
                     <Route exact path='/'>
                        <CarouselBar />
                        <ContentLayout>
                           <Product />
                        </ContentLayout>
                     </Route>

                     <Route path='/product'>
                        <Product />
                     </Route>

                     <Route path='/profile'>
                        <ProfileLayout>
                           <Profile />
                        </ProfileLayout>
                     </Route>

                     <Route path='/message'>
                        <Message />
                     </Route>
                  </Switch>
               </MainLayout>
            </Route>
         </Switch>
      </Router>
   );
}

export default Routers;
