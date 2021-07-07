import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from './api/userApi';
import './App.css';
import { userInfo } from './features/Auth/loginSlice';
import { auth } from './firebase';
import Routers from './router';

function App() {
   const dispatch = useDispatch();
   const userId = useSelector((state) => state.users.id);
   const [profileIsExist, setProfileIsExist] = useState(true);

   useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
         if (!user) {
            console.log('User is not logged in');
            return;
         }
         const action = userInfo({
            loginStatus: true,
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
         });
         dispatch(action);

         console.log('User is logged in: ', user);
         localStorage.setItem('providerData', true);
      });

      return () => unregisterAuthObserver();
   }, [dispatch]);

   useEffect(() => {
      const checkUserProfileInDb = async () => {
         try {
            if (!userId || localStorage.getItem('isExist')) return;
            const response = await userApi.getUserProfile({
               firebaseId: userId,
            });
            setProfileIsExist(response.data === null ? false : response);
            if (response.data === null ? false : response)
               return localStorage.setItem('isExist', true);
         } catch (error) {
            return console.log('Error: ', error);
         }
      };
      checkUserProfileInDb();
   }, [userId]);

   return (
      <div className='App'>
         <Routers profileIsExist={profileIsExist} />
      </div>
   );
}

export default App;
