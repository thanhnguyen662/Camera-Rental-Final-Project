import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyCvn5zLOIAUyhYqB4X5tjSo_hl3roIx8rc',
   authDomain: 'camera-rental-project.firebaseapp.com',
   projectId: 'camera-rental-project',
   storageBucket: 'camera-rental-project.appspot.com',
   messagingSenderId: '732313924569',
   appId: '1:732313924569:web:b634e5f2b859f03759dfc8',
   measurementId: 'G-GCCTZV0S66',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
