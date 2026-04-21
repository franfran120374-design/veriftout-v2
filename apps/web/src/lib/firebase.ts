import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyDbwdY3AnIwd-N9gBGJMOFrSyZ87tugjlg',
  authDomain: 'veriftout-v2.firebaseapp.com',
  projectId: 'veriftout-v2',
  storageBucket: 'veriftout-v2.firebasestorage.app',
  messagingSenderId: '1037417231551',
  appId: '1:1037417231551:web:c7a62439b295938b99020a'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west1');
