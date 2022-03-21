import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB48D9abKds1fwqw_PpRNBqTQFj1-a4nL4',
  authDomain: 'fakelook-storage.firebaseapp.com',
  projectId: 'fakelook-storage',
  storageBucket: 'fakelook-storage.appspot.com',
  messagingSenderId: '346898350323',
  appId: '1:346898350323:web:f81e8b23708224c1aa3786',
  measurementId: 'G-HC6DWKMCT9'
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
