// firebaseClient.js
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { writable } from 'svelte/store';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
let userObj = null; 
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Create a user store
export const userStore = writable(null);
export const userData = writable([]);

// Listen for auth state changes
onAuthStateChanged(auth, async user => {
  userStore.set(user);
  userObj = user; 
  addUserDB();
  loadData();
});

export const loginWithGoogle = () => {
  signInWithPopup(auth, provider); 
};

export const addUserDB = async () => {
  try {
    const userDocRef = doc(db, "users", userObj.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
        const docRef = setDoc(doc(db, "users", userObj.uid), { rank: "unrated", rating: 0 });
    }
  } catch (error) {}
};

export const loadData = async () => {
  try {
    const documentRef = doc(db, 'users', userObj.uid);
    const docSnap = await getDoc(documentRef);

    if (docSnap.exists()) {
      userData.set([docSnap.get('rank'), docSnap.get('rating')]);
    }
  } catch (error) {}
}

export const updateDB = async (newRank) => {
  try {
    const documentID = userObj.uid;
    const documentRef = doc(db, 'users', documentID);

    await updateDoc(documentRef, {
      rank: newRank
    });    
  }catch(error){}
}

export const logOut = () => {
  signOut(auth).then(() => {
    userStore.set(null);
    userData.set(null);
  }).catch(error => {
    console.error("An error occurred during sign out: ", error);
  });
};
