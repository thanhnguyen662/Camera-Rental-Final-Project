import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { getMe } from './features/Auth/loginSlice';
import Routers from './router';

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

   useEffect(() => {
      const unregisterAuthObserver = firebase
         .auth()
         .onAuthStateChanged(async (user) => {
            if (!user) {
               console.log('User is not logged in');
               return;
            }
            localStorage.setItem('providerData', user.uid);
         });

      return () => unregisterAuthObserver();
   }, []);

   return (
      <div className='App'>
         <Router>
            <Routers />
         </Router>
      </div>
   );
}

export default App;
