import { Layout } from 'antd';
import React from 'react';
import {
   BrowserRouter as Router,
   Redirect,
   Route,
   Switch,
} from 'react-router-dom';
import ResponseResult from '../components/ResponseResult';
import Admin from '../features/Admin';
import SignIn from '../features/Auth';
import Category from '../features/Category';
import Home from '../features/Home';
import Manages from '../features/Manages';
// import ManageShop from '../features/ManageShop';
import Maps from '../features/Maps';
// import Message from '../features/Message';
// import MessageBeta from '../features/MessageBeta';
import MessageBeta1 from '../features/MessageBeta1';
import Product from '../features/Product';
import Profile from '../features/Profile';
import Search from '../features/Search';
import Social from '../features/Social';
import MainLayout from '../layouts/Main';

const { Content } = Layout;

function Routers(props) {
   const { profileIsExist } = props;
   const isUserLogging = localStorage.getItem('providerData') ? true : false;
   return (
      <Router>
         <Switch>
            <Route path='/account' component={SignIn} />
            {!profileIsExist && (
               <Redirect
                  to={{
                     pathname: '/account/register',
                     state: { currentStep: 1 },
                  }}
               />
            )}

            <Route path='/responseResult' component={ResponseResult} />

            <Route>
               <MainLayout>
                  <Switch>
                     <Route exact path='/'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Home />
                        </Content>
                     </Route>
                     <Route path='/product'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Product />
                        </Content>
                     </Route>
                     <Route path='/search'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Search />
                        </Content>
                     </Route>
                     <Route path='/category'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Category />
                        </Content>
                     </Route>
                     <Route path='/maps'>
                        <Content style={{ minHeight: 550, overflow: 'hidden' }}>
                           <Maps />
                        </Content>
                     </Route>
                     <Route path='/messageBeta1'>
                        <MessageBeta1 />
                     </Route>

                     {isUserLogging === false && (
                        <Redirect to='/account/login' />
                     )}
                     <Route path='/social'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Social />
                        </Content>
                     </Route>

                     <Route path='/admin'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Admin />
                        </Content>
                     </Route>

                     {/* <Route path='/manage'>
                        <Content style={{ margin: '25px 125px' }}>
                           <ManageShop />
                        </Content>
                     </Route> */}

                     <Route path='/profile'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Profile />
                        </Content>
                     </Route>

                     <Route path='/manages'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Manages />
                        </Content>
                     </Route>

                     {/* <Route path='/message'>
                        <Message />
                     </Route> */}

                     {/* <Route path='/messageBeta'>
                        <MessageBeta />
                     </Route> */}
                  </Switch>
               </MainLayout>
            </Route>
         </Switch>
      </Router>
   );
}

export default Routers;
