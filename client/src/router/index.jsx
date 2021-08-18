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
                        <div style={{ margin: '25px 125px' }}>
                           <Home />
                        </div>
                     </Route>

                     <Route path='/lading'>
                        <Lading />
                     </Route>

                     <Route path='/product'>
                        <div style={{ margin: '25px 125px' }}>
                           <Content style={{ minHeight: 550 }}>
                              <Product />
                           </Content>
                        </div>
                     </Route>

                     <Route path='/admin'>
                        <div style={{ margin: '25px 125px' }}>
                           <Content style={{ minHeight: 550 }}>
                              <Admin />
                           </Content>
                        </div>
                     </Route>

                     <Route path='/manage'>
                        <div style={{ margin: '25px 125px' }}>
                           <Content style={{ minHeight: 550 }}>
                              <ManageShop />
                           </Content>
                        </div>
                     </Route>

                     <Route path='/profile'>
                        <div style={{ margin: '25px 125px' }}>
                           <Content style={{ minHeight: 550 }}>
                              <Profile />
                           </Content>
                        </div>
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
