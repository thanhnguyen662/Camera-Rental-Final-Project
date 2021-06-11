import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './features/Login';
import Register from './features/Register';
import { useDispatch } from 'react-redux';
import { getMe } from './features/Login/loginSlice';
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      const getCurrentUser = async () => {
         try {
            const actionResult = await dispatch(getMe());
            const currentUser = unwrapResult(actionResult);
            console.log('User Information: ', currentUser);
         } catch (error) {
            console.log('Fail: ', error);
         }
      };
      getCurrentUser();
   }, [dispatch]);

   return (
      <Router>
         <Navbar />
         <div className='App'>
            <Switch>
               <Route path='/login' component={Login} />
               <Route path='/register' component={Register} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
