import React from 'react';
import {
   BrowserRouter as Router,
   Redirect,
   Route,
   Switch,
} from 'react-router-dom';
import CarouselBar from '../components/CarouselBar';
import SignIn from '../features/Auth';
import Category from '../features/Category';
import Lading from '../features/Lading';
import Message from '../features/Message';
import Product from '../features/Product';
import Profile from '../features/Profile';
import Promotion from '../features/Promotion';
import ContentLayout from '../layouts/Content';
import MainLayout from '../layouts/Main';
// import ProfileLayout from '../layouts/Profile';

function Routers(props) {
   const { profileIsExist } = props;

   return (
      <Router>
         <Switch>
            <Route path='/account' component={SignIn} />
            {!profileIsExist && (
               <Redirect
                  to={{
                     pathname: '/account/register',
                     state: { currentStep: 2 },
                  }}
               />
            )}

            <Route>
               <MainLayout>
                  <Switch>
                     <Route exact path='/'>
                        <div style={{ margin: '25px 125px' }}>
                           <CarouselBar />
                           <ContentLayout>
                              <Category />
                              <Product />
                              <Promotion />
                           </ContentLayout>
                        </div>
                     </Route>

                     <Route path='/lading'>
                        <ContentLayout>
                           <Lading />
                        </ContentLayout>
                     </Route>

                     <Route path='/product'>
                        <div style={{ margin: '25px 125px' }}>
                           <Product />
                        </div>
                     </Route>

                     <Route path='/profile'>
                        <div style={{ margin: '25px 125px' }}>
                           <Profile />
                        </div>
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
