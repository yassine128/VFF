<script type="text/javascript">
	import * as firebase from 'firebase/app';
	import {
	  getAuth, 
	  GoogleAuthProvider, 
	  signInWithPopup, 
	  onAuthStateChanged, 
	  signOut,
	} from 'firebase/auth';
	import { onMount } from 'svelte'; 
	let userObj; 

	const firebaseConfig = {
	  // Your Firebase project configuration
	  apiKey: import.meta.env.VITE_API_KEY,
	  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	  projectId: import.meta.env.VITE_PROJECT_ID,
	  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	  appId: import.meta.env.VITE_APP_ID,
	};

	const app = firebase.initializeApp(firebaseConfig);
	const auth = getAuth(app);

	/*
	 * Logic to login/create a user with Gmail
	 */
  	const loginWithGoogle = () => {
  		signInWithPopup(auth, new GoogleAuthProvider()); 
  	}

  	/*
  	 * Logic to check if the user is logged in 
  	 */
  	let userLoggedIn = false; 
	onAuthStateChanged(auth, (user) => {
	  if (user) {
	    //const uid = user.uid;
	    userObj = user; 
	    userLoggedIn = true; 
	  }
	});

	/*
	 * Logic to log-out a user 
	 */
	const logOut = () => {
			signOut(auth).then(() => {
		  	// Sign-out successful.
			userLoggedIn = false; 
		}).catch((error) => {
		  	// An error happened.
			console.log("An Error Occured :(")
		});
	}


</script>

{#if userLoggedIn}
	<p>You are logged in as {userObj.displayName}</p>
	<button on:click={logOut}>Log Out</button>
{:else}
	<p>You are not logged in.</p>
	<button on:click={loginWithGoogle}>Login with Google</button>
{/if}
