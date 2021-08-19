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
import Home from '../features/Home';
import Lading from '../features/Lading';
import ManageShop from '../features/ManageShop';
import Maps from '../features/Maps';
import Message from '../features/Message';
import MessageBeta from '../features/MessageBeta';
import Product from '../features/Product';
import Profile from '../features/Profile';
import MainLayout from '../layouts/Main';

const { Content } = Layout;

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

            <Route path='/responseResult' component={ResponseResult} />

            <Route>
               <MainLayout>
                  <Switch>
                     <Route exact path='/'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Home />
                        </Content>
                     </Route>

                     <Route path='/lading'>
                        <Lading />
                     </Route>

                     <Route path='/product'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Product />
                        </Content>
                     </Route>

                     <Route path='/admin'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Admin />
                        </Content>
                     </Route>

                     <Route path='/manage'>
                        <Content style={{ margin: '25px 125px' }}>
                           <ManageShop />
                        </Content>
                     </Route>

                     <Route path='/profile'>
                        <Content style={{ margin: '25px 125px' }}>
                           <Profile />
                        </Content>
                     </Route>

                     <Route path='/message'>
                        <Message />
                     </Route>

                     <Route path='/messageBeta'>
                        <MessageBeta />
                     </Route>

                     <Route path='/maps'>
                        <Content style={{ minHeight: 550, overflow: 'hidden' }}>
                           <Maps />
                        </Content>
                     </Route>
                  </Switch>
               </MainLayout>
            </Route>
         </Switch>
      </Router>
   );
}

export default Routers;
