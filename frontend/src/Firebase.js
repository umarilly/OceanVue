
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBo0OHfZBWRX6YxHcVZt0S8GlhIVWOWf4A",
    authDomain: "oceanvue-f28bd.firebaseapp.com",
    projectId: "oceanvue-f28bd",
    storageBucket: "oceanvue-f28bd.appspot.com",
    messagingSenderId: "735777868618",
    appId: "1:735777868618:web:aecfd180b679b8fddd8fb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

// Function to check if an email already exists
const checkIfEmailExists = async (email) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

export { app, auth, db , checkIfEmailExists , storage };
