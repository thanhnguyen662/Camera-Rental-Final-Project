import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { getMe } from './features/Login/loginSlice';
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

   return (
      <Router>
         <Routers />
      </Router>
   );
}

export default App;
